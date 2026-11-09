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
    window.dispatchEvent(new Event('dashka-language-changed'));
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

// Explicit 0–10 relevance scores. Stored on this device for the morning editor.
var DashkaFeedback = (function () {
  var KEY = 'dw-feedback-v1';
  var state = { version: 1, ratings: {} };
  var counter = 0;
  var topicNames = {
    ai: ['ИИ', 'AI'], robots: ['роботы', 'robots'], gadgets: ['гаджеты', 'gadgets'],
    transport: ['транспорт', 'transport'], yandex: ['Яндекс', 'Yandex'],
    business: ['бизнес', 'business'], security: ['безопасность', 'security'],
    energy: ['энергетика', 'energy'], space: ['космос', 'space'],
    biotech: ['биотехнологии', 'biotech'], quantum: ['квантовые технологии', 'quantum'],
    crypto: ['крипто', 'crypto'], internet: ['интернет', 'internet']
  };
  var patterns = {
    ai: /(?:\bai\b|artificial intelligence|openai|chatgpt|нейросет|\bии\b|искусственн.*интеллект|модел[ьи])/i,
    robots: /robot|робот|physical ai|физикал/i,
    gadgets: /gadget|device|iphone|smartphone|phone|ring|headphone|смартфон|телефон|кольц|гаджет|наушник/i,
    transport: /transport|robotaxi|autonom|self.driv|транспорт|беспилот|роботакси|самоуправ/i,
    yandex: /yandex|яндекс/i,
    business: /funding|deal|acquir|invest|startup|revenue|сделк|инвест|выручк|стартап/i,
    security: /security|hack|cyber|privacy|безопасн|уязвим|кибер|взлом/i,
    energy: /energy|solar|grid|battery|энерг|солнечн|электросет|батаре/i,
    space: /space|nasa|moon|satellite|космос|луна|спутник|астроном/i,
    biotech: /bio|medical|health|drug|биотех|медицин|здоров|лекарств/i,
    quantum: /quantum|квант/i,
    crypto: /crypto|bitcoin|web3|крипто|биткоин/i,
    internet: /internet|data.center|cloud|интернет|датацентр|облак/i
  };
  var rubricTopics = {
    ai: 'ai', physical_ai: 'robots', hardware: 'gadgets', business: 'business',
    yandex: 'yandex', russia: 'internet'
  };
  try {
    var stored = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (stored && stored.version === 1 && stored.ratings && typeof stored.ratings === 'object') state = stored;
  } catch (e) { /* Storage can be disabled. */ }

  function language(ru, en) { return document.body.classList.contains('en') ? en : ru; }
  function sourceKey(url) {
    try {
      var p = new URL(url);
      if (p.hostname === 't.me') {
        var channel = p.pathname.split('/')[1] || 'telegram';
        return channel === 'autonomy_yandex' ? 'autonomy_yandex_tg' : channel;
      }
      var host = p.hostname.replace(/^www\./, '');
      return ({ 'techcrunch.com': 'techcrunch', 'theverge.com': 'theverge',
        'futurism.com': 'futurism', 'bbc.co.uk': 'bbc', 'bbc.com': 'bbc',
        'rozetked.me': 'rozetked', 'autonomy.yandex.ru': 'autonomy_yandex',
        'advanced.onlinelibrary.wiley.com': 'wiley_advanced',
        'theinformation.com': 'theinformation' })[host] || host;
    } catch (e) { return 'unknown'; }
  }
  function topics(title, rubric) {
    var found = Object.keys(patterns).filter(function (key) { return patterns[key].test(title || ''); });
    if (rubricTopics[rubric] && found.indexOf(rubricTopics[rubric]) < 0) found.push(rubricTopics[rubric]);
    return found;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* Session-only fallback. */ }
  }
  function bind(target, item) {
    if (!item.url || target.dataset.ratingReady) return;
    target.dataset.ratingReady = '1';
    var previous = state.ratings[item.url];
    var id = 'relevance-' + (++counter);
    var label = document.createElement('label');
    label.htmlFor = id;
    label.className = 'rating-label';
    label.innerHTML = '<span class="lang-ru">Релевантность</span><span class="lang-en">Relevance</span>';
    var input = document.createElement('input');
    input.id = id;
    input.type = 'range';
    input.min = '0';
    input.max = '10';
    input.step = '1';
    input.value = previous ? previous.score : 5;
    input.setAttribute('aria-label', language('Релевантность новости от 0 до 10', 'Story relevance from 0 to 10'));
    var output = document.createElement('output');
    output.htmlFor = id;
    output.textContent = previous ? previous.score + ' / 10' : '— / 10';
    var scale = document.createElement('span');
    scale.className = 'rating-ends';
    var low = document.createElement('span');
    low.textContent = '0';
    var high = document.createElement('span');
    high.textContent = '10';
    scale.appendChild(low);
    scale.appendChild(high);
    var clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'rating-clear';
    clear.innerHTML = '<span class="lang-ru">Сбросить</span><span class="lang-en">Clear</span>';
    clear.hidden = !previous;
    target.appendChild(label);
    target.appendChild(input);
    target.appendChild(output);
    target.appendChild(scale);
    target.appendChild(clear);
    input.addEventListener('input', function () {
      var score = Number(input.value);
      output.textContent = score + ' / 10';
      state.ratings[item.url] = { score: score, title: item.title, source: item.source || sourceKey(item.url),
        topics: topics(item.title, item.rubric), updated_at: new Date().toISOString() };
      save();
      clear.hidden = false;
      window.dispatchEvent(new Event('dashka-feedback-changed'));
    });
    input.addEventListener('change', function () {
      window.dispatchEvent(new Event('dashka-feedback-committed'));
    });
    clear.addEventListener('click', function () {
      delete state.ratings[item.url];
      save();
      input.value = 5;
      output.textContent = '— / 10';
      clear.hidden = true;
      window.dispatchEvent(new Event('dashka-feedback-changed'));
      window.dispatchEvent(new Event('dashka-feedback-committed'));
    });
  }
  function model() {
    var sources = {}, themes = {};
    Object.keys(state.ratings).forEach(function (url) {
      var row = state.ratings[url];
      if (typeof row.score !== 'number' || row.score < 0 || row.score > 10) return;
      var weight = (row.score - 5) / 5;
      var source = row.source || sourceKey(url);
      if (!sources[source]) sources[source] = { total: 0, n: 0 };
      sources[source].total += weight; sources[source].n++;
      (row.topics || []).forEach(function (topic) {
        if (!themes[topic]) themes[topic] = { total: 0, n: 0 };
        themes[topic].total += weight; themes[topic].n++;
      });
    });
    return { sources: sources, themes: themes };
  }
  function score(item, preferences) {
    var saved = state.ratings[item.url];
    var direct = saved ? (saved.score - 5) / 5 * 2 : 0;
    var source = preferences.sources[item.source || sourceKey(item.url)];
    var sourceWeight = source ? source.total / (source.n + 2) : 0;
    var matched = topics(item.title, item.rubric);
    var themeWeight = matched.reduce(function (sum, topic) {
      var found = preferences.themes[topic];
      return sum + (found ? found.total / (found.n + 2) : 0);
    }, 0) / Math.max(1, matched.length);
    return direct + sourceWeight + themeWeight * 1.5;
  }
  function summary() {
    var rows = Object.values(state.ratings);
    var text = language('Оценено новостей: ', 'Stories rated: ') + rows.length + '. ';
    if (!rows.length) return text + language('Двигайте шкалу 0–10; режим «Для меня» начнёт подстраивать порядок.',
      'Move the 0–10 scale; For me will start adapting the order.');
    var themes = model().themes;
    var favorites = Object.keys(themes).filter(function (key) { return themes[key].total > 0; })
      .sort(function (a, b) { return themes[b].total / (themes[b].n + 2) - themes[a].total / (themes[a].n + 2); })
      .slice(0, 3).map(function (key) { return topicNames[key][document.body.classList.contains('en') ? 1 : 0]; });
    return text + (favorites.length ? language('Чаще интересуют: ', 'Current interests: ') + favorites.join(', ') + '.' :
      language('Оценки влияют на порядок «Для меня».', 'Scores shape the For me order.'));
  }
  document.querySelectorAll('.rating-widget[data-feedback-id]').forEach(function (target) {
    bind(target, { url: target.dataset.feedbackId, title: target.dataset.feedbackTitle || '',
      rubric: target.dataset.feedbackRubric || '' });
  });
  return { bind: bind, model: model, score: score, summary: summary };
})();

// The unedited source stream is kept separate from verified editorial stories.
(function () {
  var list = document.getElementById('stream-list');
  if (!list) return;
  var select = document.getElementById('stream-source');
  var sort = document.getElementById('stream-sort');
  var count = document.getElementById('stream-count');
  var summary = document.getElementById('feedback-summary');
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
    if (sort.value === 'personal') {
      var preferences = DashkaFeedback.model();
      items.sort(function (a, b) {
        return DashkaFeedback.score({ url: b.url, title: b.title, source: b.source_id }, preferences)
          - DashkaFeedback.score({ url: a.url, title: a.title, source: a.source_id }, preferences);
      });
    }
    list.replaceChildren();
    items.slice(0, visible).forEach(function (x) {
      var row = node('article', 'stream-row');
      var meta = node('div', 'stream-meta');
      meta.appendChild(node('span', 'stream-name', x.source_name));
      if (x.attribution) meta.appendChild(node('span', 'stream-attribution', x.attribution));
      meta.appendChild(node('span', '', x.published ? dateLabel(x.published) : label('Обнаружено ', 'Found ') + dateLabel(x.first_seen)));
      row.appendChild(meta);
      var main = node('div', 'stream-main');
      var link = node('a', 'stream-title', x.title);
      link.href = x.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      main.appendChild(link);
      var rating = node('div', 'rating-widget');
      DashkaFeedback.bind(rating, { url: x.url, title: x.title, source: x.source_id });
      main.appendChild(rating);
      row.appendChild(main);
      list.appendChild(row);
    });
    if (!items.length) list.appendChild(node('p', 'stream-loading', label('Публикаций пока нет.', 'No posts collected yet.')));
    count.textContent = label('Собрано ', 'Collected ') + items.length + label(' · показано ', ' · shown ') + Math.min(visible, items.length);
    summary.textContent = DashkaFeedback.summary();
    more.hidden = items.length <= visible;
  }
  select.addEventListener('change', function () { visible = 60; render(); });
  sort.addEventListener('change', function () { visible = 60; render(); });
  more.addEventListener('click', function () { visible += 60; render(); });
  window.addEventListener('dashka-feedback-changed', function () { summary.textContent = DashkaFeedback.summary(); });
  window.addEventListener('dashka-feedback-committed', function () { if (sort.value === 'personal') render(); });
  window.addEventListener('dashka-language-changed', render);
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
