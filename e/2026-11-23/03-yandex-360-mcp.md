---
date: 2026-11-23
rubric: yandex
title_ru: Яндекс 360 открыл предварительный доступ внешним ИИ-агентам
title_en: Yandex 360 opens preview access to external AI agents
dek_ru: MCP-сервер соединяет агентов с почтой, диском и другими офисными сервисами в пределах прав пользователя.
dek_en: An MCP server connects agents to mail, files, and other office tools within a user's permissions.
source: https://t.me/anti_agi/2328
primary_source: https://www.yandex.ru/company/news/20-11-2026-02
primary_verified: true
generated: true
---

## Русская версия

Яндекс 360 [объявил](https://www.yandex.ru/company/news/20-11-2026-02/) 20 ноября о запуске MCP-сервера в режиме предварительного доступа. Через него внешние ИИ-агенты могут обращаться к инструментам виртуального офиса: Почте, Диску, Календарю, Телемосту, Вики, Трекеру и Формам. Повод появился в anti_agi; перечень сервисов и условия подключения мы сверили с заявлением Яндекса. Это доступ к инструментам для настроенных агентов, а не автоматическое включение ИИ во все аккаунты.

Механика строится на Model Context Protocol — открытом способе связывать ассистента с внешними сервисами. Пользователь может попросить агента найти письмо, собрать сведения из документов или подготовить встречу. Компания говорит, что её сервер работает на стороне Яндекс 360, а разработчикам и пользователям нужно настроить своего агента и подключение. Поддерживаются внешние интерфейсы, включая ChatGPT, Claude и DeepSeek, а также решения Яндекса.

Наиболее важное ограничение касается прав доступа. По описанию компании, агент получает те же разрешения, что и пользователь, и может применять только разрешённые инструменты. Например, он способен составить черновик письма, но не может отправить письмо от имени человека. Для рабочих данных это не отменяет необходимости выбирать, какому агенту доверить подключение, и проверять результат его действий. Открытый протокол упрощает интеграцию, однако сам по себе не даёт гарантии точности решений агента.

В предварительном режиме подключиться могут организации — клиенты Яндекс 360 и пользователи с платной подпиской. В сообщении также упомянуто управление составом рабочих групп через MCP для корпоративных аккаунтов. Доступность каждого действия зависит от конкретных прав и настройки инструмента; утверждать, что любой агент уже может выполнять его у каждого клиента, было бы неверно. Компания обещает добавить поддержку других сервисов позднее.

### Почему это важно

Офисный ИИ становится полезнее, когда может работать с актуальной почтой, файлами и календарём, а не только отвечать по общим знаниям. Одновременно растёт цена ошибки и важность разграничения доступа. Для оценки новинки стоит смотреть на практические разрешения, журналы действий и качество результатов в предварительном режиме, а не только на список совместимых ассистентов.

## English version

Yandex 360 [announced](https://www.yandex.ru/company/news/20-11-2026-02/) a preview MCP server on November 20. It lets configured external AI agents use tools across Mail, Disk, Calendar, Telemost, Wiki, Tracker, and Forms. We spotted the announcement in anti_agi and checked the supported services and access conditions against Yandex's own statement. This is an integration for connected agents, not an automatic AI switch turned on for every account.

The connection uses Model Context Protocol, an open method for linking an assistant to outside services. A user could ask an agent to find a message, gather details from documents, or prepare a calendar event. Yandex says it hosts the server on its side; developers and customers still have to configure their agents and connections. The announcement names external interfaces such as ChatGPT, Claude, and DeepSeek alongside Yandex's own AI products.

Permissions are the central limit. According to Yandex, an agent inherits the user's access level and can use only the tools granted to it. It can draft an email, for example, but cannot send it on a person's behalf. That restriction does not remove the need to choose a trustworthy agent, review proposed actions, and check its output before relying on it for work. A shared protocol simplifies integration; it does not guarantee that an agent will reason correctly about private data.

The preview is available to Yandex 360 business customers and users with paid subscriptions. The company also describes organization-management functions, such as changing work groups, for business accounts. The actions any particular agent can perform still depend on permissions and tool configuration. It would overstate the launch to say every customer can already automate every office task. Yandex says more services will gain support later.

### Why it matters

Office agents become more useful when they can work with current mail, files, and calendars instead of only general knowledge. Their mistakes also become more consequential. The practical test for this preview will be how clearly customers can control permissions, inspect actions, and verify outcomes, rather than how many assistant names appear in the compatibility list.
