---
date: 2026-11-17
rubric: russia
title_ru: Сбой Timeweb Cloud затронул облачные сервисы в нескольких регионах
title_en: Timeweb Cloud network outage affects services across several regions
dek_ru: Провайдер зафиксировал частичную недоступность с 13:28 до 14:52 по Москве и сообщил о восстановлении работы; число затронутых сайтов неизвестно.
dek_en: The provider recorded partial unavailability from 13:28 to 14:52 Moscow time and reported recovery; the number of affected sites is unknown.
source: https://t.me/xor_journal/10533
primary_source: https://timeweb.cloud/live?tab=1
primary_verified: true
generated: true
---

## Русская версия

Timeweb Cloud [зафиксировал 17 ноября](https://timeweb.cloud/live?tab=1) частичную недоступность своих сервисов. Согласно официальной странице состояния, инцидент длился с 13:28 до 14:52 по Москве. В 14:54 провайдер сообщил, что сетевая проблема полностью устранена и сервисы работают в штатном режиме. Историю заметили через `xor_journal`, но для времени, масштаба и состояния восстановления мы опираемся на собственный журнал компании.

В списке затронутых сервисов указаны облачные серверы, облачные базы данных, App Platform, балансировщики нагрузки и Kubernetes. Страница также перечисляет зоны в Санкт-Петербурге, Москве, Казахстане, Нидерландах, Германии и США. Это перечень зон, где была отмечена частичная недоступность, а не доказательство, что каждый клиент в каждой зоне потерял доступ. На странице нет точного числа затронутых клиентов или сайтов.

В социальных сетях появились сообщения, связывающие сбой с цифрой «более 700 тысяч сайтов». Timeweb использует эту цифру для описания общей клиентской базы хостинга, поэтому она не измеряет последствия сегодняшнего инцидента. Достовернее говорить о подтверждённой проблеме в перечисленных облачных сервисах. Нельзя также делать вывод о потере данных: публичный журнал фиксирует недоступность и восстановление, но не сообщает о безвозвратной утрате информации.

### Почему это важно

Одна сетевая проблема может одновременно затронуть серверы, базы данных и инструменты развёртывания, от которых зависят приложения. Для оценки реального ущерба понадобятся последующий отчёт провайдера и данные клиентов: длительность недоступности конкретных систем, география и возможные последствия для данных. На момент публикации официально подтверждены начало, окончание и восстановление работы сервисов.

## English version

Timeweb Cloud [logged partial service unavailability on November 17](https://timeweb.cloud/live?tab=1). Its official status page dates the incident from 13:28 to 14:52 Moscow time. At 14:54, the provider said the network problem had been fully resolved and services were operating normally. We spotted the story via `xor_journal`, but use the provider's own incident log for timing, scope, and recovery status.

The listed affected services are cloud servers, managed databases, App Platform, load balancers, and Kubernetes. The page names zones in St Petersburg, Moscow, Kazakhstan, the Netherlands, Germany, and the United States. This is a list of zones where partial unavailability was recorded, not proof that every customer in each zone lost access. The page does not give a verified count of affected customers or sites.

Some social posts tie the outage to a figure of more than 700,000 websites. Timeweb uses that number to describe its overall hosting footprint; it is not a measure of this incident's impact. The supported claim is narrower: a confirmed problem with the cloud services listed by the provider. Nor does the status log establish permanent data loss. It reports an availability problem and recovery, without such a finding.

### Why it matters

A single network problem can affect servers, databases, and deployment tools at the same time. Assessing the real impact will require a later provider report and customer evidence about individual service interruptions, geography, and any data consequences. As this edition goes out, the official record confirms the incident window and the provider's recovery notice.
