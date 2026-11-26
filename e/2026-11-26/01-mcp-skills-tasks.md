---
date: 2026-11-26
rubric: ai
title_ru: Серверы MCP теперь могут передавать Claude навыки и длительные задачи
title_en: MCP servers can now provide Claude with skills and long-running tasks
dek_ru: Anthropic открыла бета-доступ к навыкам через MCP и расширила поддержку задач, запросов ввода и файлов.
dek_en: Anthropic opened a beta for skills delivered through MCP and expanded support for tasks, input requests, and files.
source: https://t.me/anti_agi/2342
primary_source: https://claude.com/resources/articles/skills-over-mcp-tasks-and-more
primary_verified: true
generated: true
---

## Русская версия

Anthropic [описала](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more) 24 ноября обновления работы Claude с серверами Model Context Protocol. Серверы теперь могут публиковать не только инструменты, но и навыки — инструкции по применению этих инструментов для конкретных задач. Claude загружает такой навык по мере необходимости. Пользователю не требуется отдельно устанавливать его, если он приходит вместе с подключённым сервером. Повод мы заметили в anti_agi и сверили с полным анонсом Anthropic.

Skills over MCP доступны в публичной бета-версии Claude и Claude Code. По данным компании, у подписчиков Pro, Max и Ultra возможность включена по умолчанию, а для Team её должен разрешить администратор. Для Enterprise поддержка обещана позже. Важное ограничение: это описание доступности в продуктах Anthropic, а не утверждение, что любой клиент MCP уже понимает навыки одинаково.

Другое изменение касается длительной работы. Механизм Tasks позволяет серверу продолжать операцию в фоне, пока Claude занимается другими шагами, а затем получить результат. Elicitation даёт серверу способ запросить у пользователя данные или подтверждение по ходу вызова. Anthropic пишет, что обе возможности уже доступны в Claude и Claude Code для ряда планов. Передача файлов между клиентом и сервером ещё разворачивается, поэтому её нельзя считать общедоступной завершённой функцией.

Компания также сообщает о более чем 700 миллионах загрузок SDK MCP в месяц и свыше 10 тысяч коннекторов для Claude. Это собственные показатели Anthropic, а не независимая оценка активных пользователей. Спецификация остаётся открытой, но внедрение отдельных расширений зависит от клиента и сервера.

### Почему это важно

Подключённому агенту нужны не только команды доступа к данным, но и контекст о том, как выполнять длинную работу. Поставка инструкций вместе с сервером уменьшает ручную настройку, а фоновые задачи расширяют набор сценариев. Практическая ценность будет зависеть от поддержки у конкретных клиентов, прозрачности разрешений и того, насколько надёжно агент возвращает результат.

## English version

Anthropic [described](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more) a set of changes to Claude's Model Context Protocol support on November 24. MCP servers can now provide skills as well as tools. A skill tells Claude how to use a server's capabilities for a particular workflow, and Claude loads it only when needed. The guidance can update with the server, so a user does not have to install a separate local package for that connected service. We spotted the story in anti_agi and checked it against Anthropic's full announcement.

Skills over MCP is in public beta in Claude and Claude Code. Anthropic says it is on by default for Pro, Max, and Ultra users, while Team administrators must enable it. Enterprise support is planned for later. Those are product-specific availability terms; they do not mean every MCP client already handles server-delivered skills in the same way.

The update also covers work that takes longer than a single tool call. Tasks lets an MCP server continue an operation in the background while Claude works on something else, then return a result. Elicitation lets a server request user input or approval during an operation. Anthropic says those two capabilities are generally available in Claude and Claude Code for several subscription tiers. File Uploads is still rolling out, so it should not be presented as a fully deployed feature for everyone.

Anthropic also reports more than 700 million monthly MCP SDK downloads and over 10,000 connectors for Claude. These are the company's figures, not an independent count of active users. The protocol is open, but real support for each extension still depends on both the client and the server.

### Why it matters

An agent needs more than a list of callable tools to complete a substantial workflow. Shipping instructions with the server can reduce setup, while background tasks allow longer operations. The practical test is whether specific clients support the extensions reliably, make permissions clear, and return results users can check.
