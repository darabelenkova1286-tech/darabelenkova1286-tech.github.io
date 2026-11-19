---
date: 2026-11-19
rubric: security
title_ru: Для nginx вышли исправления пяти уязвимостей из цепочки NGINX2Root
title_en: nginx releases fixes for five vulnerabilities in the NGINX2Root chain
dek_ru: Исследователи описали удалённое выполнение кода при определённых конфигурациях; официальные исправленные версии — 1.30.7 и 1.31.9.
dek_en: Researchers describe remote code execution under specific configurations; the official fixed releases are 1.30.7 and 1.31.9.
source: https://t.me/antiinfosec/308
primary_source: https://nginx.org/en/security_advisories.html
primary_verified: true
generated: true
---

## Русская версия

Проект nginx [опубликовал перечень исправлений](https://nginx.org/en/security_advisories.html) для пяти уязвимостей, которые исследователи Xint объединили под именем NGINX2Root. Исправленные версии открытого nginx — 1.30.7 в стабильной ветке и 1.31.9 в основной. [Новостная лента проекта](https://nginx.org/news.html) датирует их выпуск 18 ноября. Повод мы обнаружили в канале `antiinfosec`, после чего сверили описание с официальным списком уязвимостей и [техническим разбором Xint](https://xint.io/blog/nginx2root-remote-code-execution).

Самая заметная ошибка, CVE-2026-123007, затрагивает обработку управления потоком HTTP/2. В официальном бюллетене она имеет уровень major; уязвимыми указаны версии с 1.9.5 по 1.31.8. Xint показывает возможность выполнения команд без авторизации при включённом HTTP/2 и подходящей конфигурации. Остальные четыре проблемы касаются других путей обработки запросов и сервисов; условия эксплуатации у них различаются. Поэтому утверждение «любой nginx-сервер немедленно взломан» не следует из публикации.

Исследователи также описали отдельную ошибку повышения привилегий в ядре Linux, которую можно соединить с одной из ошибок nginx. Это отдельная проблема: обновление веб-сервера закрывает описанный вход через nginx, но не исправляет само ядро. Приоритет для администраторов — установить исправленный пакет, предоставленный разработчиком или поставщиком дистрибутива, и перезапустить службу. Временное отключение HTTP/2 снижает риск только для части описанных ошибок и не заменяет обновление.

### Почему это важно

nginx стоит перед множеством сайтов и приложений, поэтому изменение его безопасности имеет широкий потенциальный охват. Реальный риск зависит от установленной версии, активных модулей и настроек конкретного сервера. Официальная таблица позволяет проверить применимость каждого CVE отдельно. Публичные материалы пока не дают достоверной оценки числа атак или скомпрометированных систем; наличие демонстрации эксплуатации не доказывает массовый взлом.

## English version

The nginx project [lists fixes](https://nginx.org/en/security_advisories.html) for five vulnerabilities grouped by Xint researchers under the name NGINX2Root. The fixed open-source releases are 1.30.7 on the stable branch and 1.31.9 on mainline. The project's [news page](https://nginx.org/news.html) dates both releases to November 18. We spotted the story in `antiinfosec`, then checked the official advisory list and [Xint's technical report](https://xint.io/blog/nginx2root-remote-code-execution).

The most prominent flaw, CVE-2026-123007, affects HTTP/2 flow-control handling. nginx labels it major and lists versions 1.9.5 through 1.31.8 as vulnerable. Xint demonstrates unauthenticated command execution when HTTP/2 is enabled and the relevant conditions are met. The other four flaws involve different request-processing paths or services, with different requirements for exploitation. The disclosure therefore does not mean that every nginx installation has already been compromised.

The researchers also describe a separate Linux kernel privilege-escalation flaw that can be chained with an nginx entry point. It is a distinct issue: updating nginx closes the described route through the web server, but does not patch the kernel itself. Administrators should obtain a fixed package from nginx or their distribution vendor and restart the service. Disabling HTTP/2 can reduce exposure to some of the disclosed flaws, but it does not address all five and should not replace patching.

### Why it matters

nginx sits in front of many websites and applications, so a change to its security has broad potential reach. Actual exposure depends on the installed version, enabled modules, and each server's configuration. The official advisory table lets operators assess the individual CVEs. The public record does not establish how many systems were attacked or compromised; a proof of exploitation is not evidence of a mass breach.
