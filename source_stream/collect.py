#!/usr/bin/env python3
"""Collect direct source-page links into an incremental public timeline. No RSS."""
from __future__ import annotations

import datetime as dt
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "source-stream.json"
SOURCES = ROOT / "sources.json"
USER_AGENT = "DashkaWire/1.0 (+https://darabelenkova1286-tech.github.io/)"
MAX_TG_PAGES = 10
NEWS_SITEMAPS = {
    "techcrunch": "https://techcrunch.com/news-sitemap.xml",
    "futurism": "https://futurism.com/sitemap-news.xml",
}
NON_ARTICLE_TITLES = {"bbc": {"send a story"}}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=15) as res:
        return res.read(2_000_000).decode("utf-8", "replace")


def absolute(base: str, href: str) -> str:
    url = urllib.parse.urljoin(base, html.unescape(href))
    parts = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc.lower(), parts.path.rstrip("/"), "", ""))


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            a = dict(attrs)
            self.current = {"url": a.get("href", ""), "title": a.get("aria-label", "") or a.get("title", "")}
        elif tag == "img" and self.current and not self.current["title"]:
            self.current["title"] = dict(attrs).get("alt", "")

    def handle_data(self, data):
        if self.current is not None:
            self.current["title"] += data

    def handle_endtag(self, tag):
        if tag == "a" and self.current is not None:
            self.links.append(self.current)
            self.current = None


def valid(source_id: str, url: str) -> bool:
    p = urllib.parse.urlsplit(url)
    host, path = p.hostname or "", p.path
    if source_id == "techcrunch":
        return host == "techcrunch.com" and bool(re.fullmatch(r"/20\d\d/\d\d/\d\d/[^/]+", path))
    if source_id == "theverge":
        return host == "www.theverge.com" and bool(re.fullmatch(r"/[^/]+/\d{5,9}/[^/]+", path))
    if source_id == "theinformation":
        return host == "www.theinformation.com" and path.startswith("/articles/")
    if source_id == "futurism":
        return host == "futurism.com" and len(path.strip("/").split("/")) == 2 and not path.startswith("/author/")
    if source_id == "bbc":
        return host in ("www.bbc.co.uk", "www.bbc.com") and bool(re.match(r"/news/(articles/[a-z0-9]+|technology-\d+)", path))
    if source_id == "autonomy_yandex":
        return host == "autonomy.yandex.ru" and path.startswith("/blog/")
    if source_id == "wiley_advanced":
        return host == "advanced.onlinelibrary.wiley.com" and path.startswith("/doi/")
    if source_id == "rozetked":
        return host == "rozetked.me" and bool(re.fullmatch(r"/(news|posts|reviews|articles)/\d+-[^/]+", path))
    return False


def collect_web(source: dict) -> tuple[list[dict], str]:
    body = fetch(source["url"])
    parser = Links()
    parser.feed(body)
    seen, items = set(), []
    for link in parser.links:
        url = absolute(source["url"], link["url"])
        title = re.sub(r"\s+", " ", html.unescape(link["title"])).strip()
        if (not valid(source["id"], url) or url in seen or len(title) < 12
                or title.casefold() in NON_ARTICLE_TITLES.get(source["id"], set())):
            continue
        seen.add(url)
        published = None
        if source["id"] == "techcrunch":
            m = re.search(r"/(20\d\d)/(\d\d)/(\d\d)/", url)
            if m:
                published = "-".join(m.groups())
        items.append({"url": url, "title": title[:350], "published": published})
    if source["id"] in NEWS_SITEMAPS:
        try:
            root = ET.fromstring(fetch(NEWS_SITEMAPS[source["id"]]))
            for entry in root:
                loc = next((tag.text for tag in entry if tag.tag.endswith("}loc")), "")
                title = next((tag.text for tag in entry.iter() if tag.tag.endswith("}title")), "")
                published = next((tag.text for tag in entry.iter() if tag.tag.endswith("}publication_date")), None)
                url = absolute(source["url"], loc or "")
                if not valid(source["id"], url) or not title:
                    continue
                post = {"url": url, "title": html.unescape(title)[:350], "published": published}
                if url in seen:
                    for item in items:
                        if item["url"] == url:
                            item.update(post)
                            break
                else:
                    items.append(post)
                    seen.add(url)
        except (ET.ParseError, urllib.error.URLError, TimeoutError):
            pass  # The main page still supplies links; coverage stays partial.
    return items, "listing" if items else "empty_listing"


class Posts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.depth = 0
        self.post_depth = self.text_depth = 0
        self.current = None
        self.items = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in ("br", "img", "meta", "link", "input", "hr", "source", "wbr"):
            self.depth += 1
        classes = a.get("class", "").split()
        if "tgme_widget_message" in classes and a.get("data-post"):
            self.current = {"url": "https://t.me/" + a["data-post"], "title": ""}
            self.post_depth = self.depth
        if self.current is not None:
            if "tgme_widget_message_text" in classes:
                self.text_depth = self.depth
            if tag == "time" and a.get("datetime"):
                self.current["published"] = a["datetime"]
            if self.text_depth and tag == "a" and a.get("href", "").startswith("https://autonomy.yandex.ru/blog/"):
                self.current["linked_source"] = absolute("https://autonomy.yandex.ru", a["href"])

    def handle_data(self, data):
        if self.current is not None and self.text_depth:
            self.current["title"] += data + " "

    def handle_endtag(self, tag):
        if tag in ("br", "img", "meta", "link", "input", "hr", "source", "wbr"):
            return
        if self.depth == self.text_depth:
            self.text_depth = 0
        if self.depth == self.post_depth and self.current is not None:
            title = re.sub(r"\s+", " ", html.unescape(self.current["title"])).strip()
            self.current["title"] = title[:350] or "Публикация с медиа без подписи"
            self.items.append(self.current)
            self.current = None
            self.post_depth = 0
        self.depth = max(0, self.depth - 1)


def collect_telegram(source: dict, known: set[str]) -> tuple[list[dict], str]:
    items, found = [], set()
    url = source["url"]
    stop_reason = "page_limit"
    for _ in range(MAX_TG_PAGES):
        body = fetch(url)
        parser = Posts()
        parser.feed(body)
        if not parser.items:
            stop_reason = "empty_listing"
            break
        for item in parser.items:
            if item["url"] not in found:
                items.append(item)
                found.add(item["url"])
        if any(item["url"] in known for item in parser.items):
            stop_reason = "known_post"
            break
        ids = [int(m.group(1)) for item in parser.items if (m := re.search(r"/(\d+)$", item["url"]))]
        if not ids:
            stop_reason = "no_page_marker"
            break
        older = source["url"] + "?before=" + str(min(ids))
        if older == url:
            stop_reason = "end"
            break
        url = older
    return items, stop_reason


def main() -> int:
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")
    sources = json.loads(SOURCES.read_text(encoding="utf-8"))
    old = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else {"items": []}
    by_url = {item["url"]: item for item in old.get("items", [])}
    by_url = {url: item for url, item in by_url.items()
              if item["title"].casefold() not in NON_ARTICLE_TITLES.get(item["source_id"], set())}
    status = []
    for source in sources:
        known = {url for url, item in by_url.items() if item["source_id"] == source["id"]}
        try:
            if source["kind"] == "telegram":
                posts, scope = collect_telegram(source, known)
            else:
                posts, scope = collect_web(source)
            for post in posts:
                if post["url"] in by_url:
                    if post.get("published"):
                        by_url[post["url"]]["published"] = post["published"]
                    if post.get("linked_source"):
                        by_url[post["url"]]["linked_source"] = post["linked_source"]
                    continue
                post.update(source_id=source["id"], source_name=source["name"],
                            tier=source["tier"], first_seen=now,
                            attribution=source.get("attribution", ""))
                by_url[post["url"]] = post
            # A listing page can omit older posts, even when the request succeeds.
            state = "partial" if scope in ("listing", "page_limit", "empty_listing", "no_page_marker") else "ok"
            status.append({"id": source["id"], "name": source["name"], "status": state,
                           "scope": scope, "found": len(posts), "checked_at": now})
            print(f"{source['id']}: {len(posts)} visible, {state} ({scope})")
        except (urllib.error.URLError, TimeoutError, ValueError) as exc:
            status.append({"id": source["id"], "name": source["name"], "status": "unavailable",
                           "error": f"{type(exc).__name__}: {str(exc)[:100]}", "checked_at": now})
            print(f"{source['id']}: unavailable ({type(exc).__name__})")
    yandex_blog_urls = {url for url, item in by_url.items() if item["source_id"] == "autonomy_yandex"}
    for url, item in list(by_url.items()):
        if item["source_id"] == "autonomy_yandex_tg" and item.get("linked_source") in yandex_blog_urls:
            del by_url[url]
    items = sorted(by_url.values(), key=lambda x: (x.get("published") or x["first_seen"], x["first_seen"]), reverse=True)
    OUTPUT.write_text(json.dumps({"updated_at": now, "items": items, "sources": status},
                                 ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {len(items)} total source posts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
