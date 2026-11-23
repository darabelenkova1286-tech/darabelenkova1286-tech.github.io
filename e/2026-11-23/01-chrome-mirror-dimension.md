---
date: 2026-11-23
rubric: security
title_ru: Chrome построил искусственный интернет для испытания браузерных ИИ-агентов
title_en: Chrome built a synthetic web to test browser agents
dek_ru: Изолированная среда позволяет испытывать действия агентов и атаки через веб-страницы без обращения к настоящим сайтам.
dek_en: An isolated environment lets engineers test agent actions and web-borne attacks without touching real sites.
source: https://t.me/anti_agi/2329
primary_source: https://blog.google/security/mirror-dimension-for-agents/
primary_verified: true
generated: true
---

## Русская версия

Команда безопасности Chrome [описала](https://blog.google/security/mirror-dimension-for-agents/) 19 ноября внутреннюю среду Mirror Dimension для проверки браузерных ИИ-агентов. Агенту показывают привычные адреса сайтов, но его действия происходят в изолированной копии веба. Это позволяет повторять один и тот же сценарий, проверять защиту от вредоносных инструкций на страницах и не рисковать реальными учётными записями или заказами. Повод мы заметили в канале anti_agi; описание устройства среды проверили по публикации самих инженеров Google.

Технически агент запускает Chrome без интерфейса в песочнице gVisor. Сетевые обращения перехватывает локальный прокси: запрос не уходит в публичный интернет, а возвращает созданную для теста страницу. Чтобы браузер не отклонял соединение как подмену сайта, внутри контролируемой песочницы установили собственный корневой сертификат. Прокси выпускает сертификаты для тестовых адресов. Такая схема предназначена для закрытой исследовательской среды, а не для браузеров пользователей.

Google говорит о тысячах имитированных сайтов и автоматическом создании интерактивных страниц для многошаговых задач. Испытания охватывают и обычные действия, и попытки внедрить скрытые команды в текст страницы, изображения, подписи элементов или ответы инструментов. Команда утверждает, что её конвейер генерирует свыше тысячи вариантов атак в день на одного инженера. Это число характеризует объём тестов, а не успешность защиты: долю заблокированных атак публикация не приводит.

### Почему это важно

У браузерного агента есть возможность нажимать кнопки и заполнять формы, поэтому ошибка может иметь последствия за пределами чата. Изолированная среда делает испытания повторяемыми и позволяет проверять неожиданные действия до выхода в обычный веб. Но наличие такой лаборатории само по себе не доказывает, что агент безопасен в реальном интернете: публичных результатов испытаний в сообщении нет.

## English version

Chrome's security team [described](https://blog.google/security/mirror-dimension-for-agents/) its internal Mirror Dimension environment on November 19. It gives browser agents familiar website addresses while keeping their actions inside a synthetic web. Engineers can replay a task from the same starting state, probe defenses against malicious instructions embedded in pages, and avoid making real purchases or changing real accounts. We found the story in anti_agi and checked the implementation details against Google's own engineering post.

The agent runs headless Chrome inside a gVisor sandbox. A local proxy intercepts network requests and serves generated pages instead of sending traffic to the public internet. The sandbox has its own trusted root certificate, allowing the proxy to issue certificates for the test addresses without triggering Chrome's normal TLS warnings. That trust setup exists inside a controlled evaluation environment; it is not a change to users' browsers.

Google says the environment contains thousands of simulated sites and can generate interactive pages for tasks that span several steps. The team tests ordinary workflows alongside attempts to smuggle instructions through page text, images, accessibility labels, or tool responses. It says its pipeline creates more than a thousand attack candidates per engineer per day. That is a measure of test volume, not a published success rate for Chrome's defenses. The post gives no comparable figure for how often the agent resists those attacks.

### Why it matters

A browsing agent can click controls and fill forms, so its mistakes can reach beyond a conversation. A sealed, repeatable web makes it possible to examine risky behavior before an agent acts on live sites. The engineering method is concrete, but the public description does not establish how safe the resulting agent is in the open web. Independent assessment would need outcome data that Google has not provided here.
