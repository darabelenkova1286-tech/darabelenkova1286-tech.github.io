#!/usr/bin/env python3
"""Send today's published edition once per channel. Standard library only."""

from __future__ import annotations

import argparse
import json
import os
import re
import smtplib
import sys
import urllib.parse
import urllib.error
import urllib.request
from datetime import datetime
from email.message import EmailMessage
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
MARKERS = ROOT / ".delivery"


def edition_date(index: str) -> str | None:
    match = re.search(r"^# .*latest edition.*\((\d{4}-\d{2}-\d{2})\)", index, re.M | re.I)
    return match.group(1) if match else None


def message(feed: dict, date: str) -> str:
    items = [item for item in feed.get("items", []) if f"/e/{date}/" in item.get("url", "")]
    if not items:
        raise ValueError("Published edition has no matching feed items")
    lines = [f"DASHKA WIRE · {date}", "", "Сегодня в технологиях:", ""]
    for number, item in enumerate(items[:7], 1):
        title = item.get("_ru", {}).get("title") or item.get("title", "Новость")
        summary = item.get("_ru", {}).get("summary") or item.get("summary", "")
        lines.extend([f"{number}. {title}", summary[:240], item["url"], ""])
    lines.append("Все материалы и первоисточники: https://darabelenkova1286-tech.github.io/")
    return "\n".join(lines)


def marker(date: str, channel: str) -> Path:
    return MARKERS / f"{date}.{channel}.json"


def send_email(body: str, date: str) -> None:
    user = os.environ["SMTP_USER"]
    password = os.environ["SMTP_PASSWORD"]
    recipient = os.environ["MAIL_TO"]
    mail = EmailMessage()
    mail["Subject"] = f"DASHKA WIRE · {date}"
    mail["From"] = user
    mail["To"] = recipient
    mail.set_content(body)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=20) as smtp:
        smtp.login(user, password)
        smtp.send_message(mail)


def send_telegram(body: str) -> None:
    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]
    payload = urllib.parse.urlencode({"chat_id": chat_id, "text": body[:3900],
                                      "disable_web_page_preview": "true"}).encode()
    # Do not print network exceptions: their URL can contain the bot token.
    try:
        with urllib.request.urlopen(
            urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage", data=payload),
            timeout=20,
        ) as response:
            result = json.load(response)
    except urllib.error.HTTPError as exc:
        reason = {400: "chat not found; send /start to the bot and check chat ID",
                  401: "bot token rejected",
                  403: "bot blocked or chat access denied"}.get(exc.code, f"HTTP {exc.code}")
        raise RuntimeError(f"Telegram delivery failed: {reason}") from None
    except Exception:
        raise RuntimeError("Telegram delivery failed: network or response error") from None
    if not result.get("ok"):
        raise RuntimeError("Telegram delivery failed: API returned not ok")


def bot_diagnostics() -> bool:
    """Print non-secret bot identity and whether the configured chat has reached it."""
    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]
    try:
        with urllib.request.urlopen(f"https://api.telegram.org/bot{token}/getMe", timeout=20) as response:
            account = json.load(response)
        username = account.get("result", {}).get("username", "")
        print(f"telegram: token belongs to @{username}")
        if username.lower() != "dashka_wire_bot":
            print("telegram: token belongs to a different bot", file=sys.stderr)
            return False
        with urllib.request.urlopen(f"https://api.telegram.org/bot{token}/getUpdates?limit=100", timeout=20) as response:
            updates = json.load(response).get("result", [])
        seen = any(str(update.get("message", {}).get("chat", {}).get("id")) == chat_id for update in updates)
        print(f"telegram: configured chat present in recent updates: {'yes' if seen else 'no'}")
    except Exception:
        print("telegram: bot identity check unavailable", file=sys.stderr)
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--test-telegram", action="store_true")
    args = parser.parse_args()
    if args.test_telegram:
        if not all(os.environ.get(name) for name in ("TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID")):
            print("telegram: bot token or chat ID is not configured", file=sys.stderr)
            return 1
        if not bot_diagnostics():
            return 1
        try:
            send_telegram("DASHKA WIRE · тест Telegram-рассылки. Бот подключён; новости придут после первого выпуска.")
        except Exception as exc:
            print(f"telegram: {exc}", file=sys.stderr)
            return 1
        print("telegram: test message sent")
        return 0
    today = datetime.now(ZoneInfo("Europe/Moscow")).date().isoformat()
    index = (ROOT / "latest.md").read_text(encoding="utf-8")
    if edition_date(index) != today:
        print(f"No published edition for {today}; nothing sent")
        return 0
    feed = json.loads((ROOT / "feed.json").read_text(encoding="utf-8"))
    body = message(feed, today)
    if args.dry_run:
        print(body)
        return 0
    failures = []
    channels = (("email", ("SMTP_USER", "SMTP_PASSWORD", "MAIL_TO"), lambda: send_email(body, today)),
                ("telegram", ("TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"), lambda: send_telegram(body)))
    for channel, required, sender in channels:
        if not all(os.environ.get(name) for name in required):
            print(f"{channel}: not configured; skipped")
            continue
        path = marker(today, channel)
        if path.exists():
            print(f"{channel}: already sent")
            continue
        try:
            sender()
            MARKERS.mkdir(exist_ok=True)
            path.write_text(json.dumps({"date": today, "channel": channel, "status": "sent"}) + "\n")
            print(f"{channel}: sent")
        except Exception:
            failures.append(channel)
            print(f"{channel}: delivery failed", file=sys.stderr)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
