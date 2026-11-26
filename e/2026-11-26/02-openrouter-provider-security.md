---
date: 2026-11-26
rubric: security
title_ru: OpenRouter отключил трёх провайдеров после проверки утечек запросов
title_en: OpenRouter removes three providers after prompt data investigation
dek_ru: Платформа также сняла статус Zero Data Retention со 125 конечных точек и уведомила потенциально затронутых клиентов.
dek_en: The platform also removed Zero Data Retention eligibility from 125 endpoints and notified potentially affected customers.
source: https://t.me/anti_agi/2340
primary_source: https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/
primary_verified: true
generated: true
---

## Русская версия

OpenRouter [сообщил](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) 22 ноября о действиях после расследования обработки пользовательских запросов у внешних провайдеров ИИ-инференса. Компания отключила от платформы трёх провайдеров, сняла пометку Zero Data Retention со 125 конечных точек и уведомила потенциально затронутых клиентов. Повод появился в anti_agi; численные данные и формулировки мы сверили с сообщением самого OpenRouter.

Проверку начали исследователи Dragos. Они использовали специальные тестовые запросы с маркерами, чтобы обнаруживать неожиданные копии данных за пределами ожидаемого маршрута. OpenRouter пишет, что результаты указали на компрометацию данных или несоблюдение заявленных политик у отдельных провайдеров. В анонсе прямо сказано: исследование не показало взлома самой системы OpenRouter и не установило несанкционированного доступа к ней. Приравнивать проблемы провайдеров к взлому маршрутизатора было бы неверно.

Платформа не называет в основной части сообщения три отключённых компании. Она публикует список отдельных уведомлений провайдеров, но этот список нельзя механически считать перечнем именно отключённых. Статус Zero Data Retention был снят шире, чем круг уже обнаруженных проблемных точек: часть исключений OpenRouter сделал превентивно. Это означает пересмотр обещания о хранении данных на уровне отдельных маршрутов, а не утверждение, что все 125 точек допустили утечку.

Дальше компания планирует повторять подобные проверки, прослеживать сетевые пути запросов и требовать подтверждения мер до восстановления статуса Zero Data Retention. Для клиентов важна и архитектура сервиса: одна заявка может проходить через маршрутизатор и выбранного поставщика вычислений, поэтому обещания о конфиденциальности следует проверять для всей цепочки обработки.

### Почему это важно

ИИ-сервис может выглядеть как единая точка доступа, хотя запрос обслуживает несколько организаций. Если пользователь отправляет туда чувствительные данные, реальная политика каждого звена имеет значение. Сообщение OpenRouter показывает конкретные меры реагирования, но не даёт основания считать все 125 маршрутов скомпрометированными или инцидент закрытым.

## English version

OpenRouter [reported](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) on November 22 that it had taken action after an investigation into how external AI inference providers handled customer prompts. It removed three providers, withdrew Zero Data Retention eligibility from 125 endpoints, and notified customers who might have been affected. We found the story in anti_agi and checked the figures and wording against OpenRouter's own notice.

Dragos researchers began with test prompts carrying markers that could reveal unexpected copies outside the intended processing path. OpenRouter says the findings pointed to compromised data or evidence that certain providers were not honoring stated data policies. Its notice explicitly says the testing did not show a breach of OpenRouter itself or unauthorized access to its systems. A problem at an inference provider should not be described as a confirmed hack of the routing platform.

The main notice does not identify the three providers it removed. It links to several provider statements, but that list is not necessarily the list of companies taken off the service. OpenRouter also says some of the 125 endpoints lost Zero Data Retention eligibility as a precaution. The number therefore describes a policy review across routes, not 125 confirmed leaks. Customers need to distinguish a verified incident from a conservative restriction while facts are still being checked.

OpenRouter says it is adapting the researchers' technique for continuing checks, verifying where requests and responses travel, and requiring evidence before it restores Zero Data Retention status. The case also illustrates the service architecture: a single customer request may involve the router and a separate compute provider. A privacy promise has to hold across that entire chain.

### Why it matters

An AI service can look like one endpoint while several organizations process the prompt behind it. For sensitive data, each provider's actual practices matter. OpenRouter has disclosed concrete response steps, but the announcement does not support treating every removed endpoint as compromised or assuming the investigation is finished.
