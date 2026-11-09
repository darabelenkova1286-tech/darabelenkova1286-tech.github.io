// Language toggle (ru default) with a brief neubrutalist loader stamp.
(function () {
  var KEY = 'dw-lang';
  var body = document.body;
  var btn = document.getElementById('langToggle');
  var loader = document.getElementById('loader');

  function apply(lang) {
    body.classList.toggle('en', lang === 'en');
    if (btn) btn.textContent = lang === 'en' ? 'RU' : 'EN';
    document.documentElement.lang = lang;
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  apply(saved === 'en' || saved === 'ru' ? saved : 'ru');

  if (btn) btn.addEventListener('click', function () {
    var next = body.classList.contains('en') ? 'ru' : 'en';
    if (loader && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      loader.classList.add('on');
      setTimeout(function () { apply(next); loader.classList.remove('on'); }, 450);
    } else {
      apply(next);
    }
    try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
  });
})();

// Hide images that failed to load (og:image links rot fast).
document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('error', function () { img.style.display = 'none'; });
});

// The unedited source stream is kept separate from verified editorial stories.
(function () {
  var list = document.getElementById('stream-list');
  if (!list) return;
  var select = document.getElementById('stream-source');
  var count = document.getElementById('stream-count');
  var more = document.getElementById('stream-more');
  var coverage = document.getElementById('stream-coverage');
  var data = { items: [], sources: [] };
  var visible = 60;
  function jumpToStream() {
    if (location.hash === '#source-stream') {
      document.getElementById('source-stream').scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  }
  window.addEventListener('pageshow', jumpToStream);
  window.addEventListener('hashchange', jumpToStream);
  function label(ru, en) { return document.body.classList.contains('en') ? en : ru; }
  function dateLabel(value) {
    if (!value) return '';
    if (value.length <= 10) return value;
    var date = new Date(value);
    if (isNaN(date.getTime())) return value.slice(0, 16).replace('T', ' ');
    return new Intl.DateTimeFormat(document.body.classList.contains('en') ? 'en-GB' : 'ru-RU', {
      timeZone: 'Europe/Moscow', day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date) + ' MSK';
  }
  function node(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text) el.textContent = text;
    return el;
  }
  function render() {
    var chosen = select.value;
    var items = data.items.filter(function (x) { return chosen === 'all' || x.source_id === chosen; });
    list.replaceChildren();
    items.slice(0, visible).forEach(function (x) {
      var row = node('article', 'stream-row');
      var meta = node('div', 'stream-meta');
      meta.appendChild(node('span', 'stream-name', x.source_name));
      if (x.attribution) meta.appendChild(node('span', 'stream-attribution', x.attribution));
      meta.appendChild(node('span', '', x.published ? dateLabel(x.published) : label('Обнаружено ', 'Found ') + dateLabel(x.first_seen)));
      row.appendChild(meta);
      var link = node('a', 'stream-title', x.title);
      link.href = x.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      row.appendChild(link);
      list.appendChild(row);
    });
    if (!items.length) list.appendChild(node('p', 'stream-loading', label('Публикаций пока нет.', 'No posts collected yet.')));
    count.textContent = label('Собрано ', 'Collected ') + items.length + label(' · показано ', ' · shown ') + Math.min(visible, items.length);
    more.hidden = items.length <= visible;
  }
  select.addEventListener('change', function () { visible = 60; render(); });
  more.addEventListener('click', function () { visible += 60; render(); });
  fetch('source-stream.json', { cache: 'no-store' }).then(function (response) {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  }).then(function (value) {
    data = value;
    (data.sources || []).forEach(function (source) {
      var option = node('option', '', source.name);
      option.value = source.id;
      select.appendChild(option);
      var line = node('p', 'coverage-row');
      line.appendChild(node('strong', '', source.name + ' · '));
      var status = source.status === 'ok' ? label('доступен', 'available') : source.status === 'partial' ? label('неполный охват', 'partial coverage') : label('сбор не удался', 'collection failed');
      line.appendChild(node('span', source.status === 'ok' ? 'coverage-ok' : 'coverage-failed', status));
      if (source.error) line.appendChild(node('span', '', ' · ' + source.error));
      coverage.appendChild(line);
    });
    render();
    requestAnimationFrame(jumpToStream);
  }).catch(function () {
    list.replaceChildren(node('p', 'stream-loading', label('Лента источников пока недоступна.', 'Source stream is currently unavailable.')));
  });
})();
