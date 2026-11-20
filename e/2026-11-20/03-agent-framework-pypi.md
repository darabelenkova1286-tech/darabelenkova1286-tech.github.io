---
date: 2026-11-20
rubric: security
title_ru: В PyPI удалили две заражённые версии Microsoft Agent Framework
title_en: Two compromised Microsoft Agent Framework releases removed from PyPI
dek_ru: Пакеты 1.26.1 и 1.26.2 собирали секреты при запуске Python; исследователи предупреждают о копиях в кэшах и внутренних зеркалах.
dek_en: Versions 1.26.1 and 1.26.2 collected secrets on Python startup; researchers warn about cached copies and internal mirrors.
source: https://t.me/antiinfosec/312
primary_source: https://socket.dev/blog/agent-framework-pypi-package-compromised-with-credential-stealer
primary_verified: true
generated: true
---

## Русская версия

Исследовательская команда Socket [разобрала подмену пакета](https://socket.dev/blog/agent-framework-pypi-package-compromised-with-credential-stealer) `agent-framework` в каталоге Python PyPI. Заражённые версии 1.26.1 и 1.26.2 были опубликованы 17 ноября. Они добавляли исполняемые файлы `.pth`: такой файл может запускать код при старте интерпретатора, даже если приложение не импортировало сам фреймворк. Обе версии собирали данные окружения и учётные секреты и отправляли их на внешний адрес. Мы заметили историю в `antiinfosec` 20 ноября и проверили первичный технический разбор.

Вторая заражённая версия изменила расположение вредоносного кода и расширила сбор сведений, связанных с GitHub Actions. Это важно для команд, которые автоматически ставят зависимости во время сборки: риск не ограничивался рабочими станциями разработчиков. [Обсуждение в репозитории Microsoft](https://github.com/microsoft/agent-framework/issues/10411) содержит подтверждение участника команды, что обе версии удалены из публичной ленты пакетов. Последней чистой версией в этом разборе названа 1.26.0.

Удаление с PyPI не стирает уже установленные копии и не гарантирует очистку кэшей `pip`, CI или корпоративных зеркал. Socket рекомендует тем, кто устанавливал 1.26.1 или 1.26.2, удалить их, проверить окружения и заменить секреты, которые могли быть доступны заражённому процессу. Публичные материалы не дают проверенного числа пострадавших организаций и не раскрывают достоверно, как злоумышленник получил право на публикацию пакета. Предположение о скомпрометированном токене загрузки остаётся предметом расследования.

### Почему это важно

Инцидент показывает, как короткое окно доступности вредоносного релиза может затронуть автоматические сборки: достаточно установки пакета, без явного вызова его функций. Практический вывод для затронутых команд — проверять точные версии в журнале зависимостей и средах сборки, а не делать вывод по текущей странице PyPI. Для остальных это пример риска цепочки поставок, но не доказательство, что любой проект на Python скомпрометирован.

## English version

Socket's research team [analyzed a malicious replacement](https://socket.dev/blog/agent-framework-pypi-package-compromised-with-credential-stealer) of the `agent-framework` package on Python's PyPI registry. Compromised releases 1.26.1 and 1.26.2 appeared on November 17. Both added executable `.pth` files, which can run code when the Python interpreter starts even if an application never imports the framework. The code collected environment data and credentials and sent them to an outside endpoint. We spotted the story in `antiinfosec` on November 20 and read the original technical analysis.

The second malicious release moved the payload and expanded collection related to GitHub Actions. That matters to teams that install dependencies in automated builds: the exposure was not limited to developers' laptops. A [discussion in Microsoft's repository](https://github.com/microsoft/agent-framework/issues/10411) includes a team member's confirmation that both versions were removed from the public package feed. The analysis identifies 1.26.0 as the last clean release in this sequence.

Removing a package from PyPI does not erase existing installations or necessarily clear `pip` caches, CI caches, and private mirrors. Socket advises anyone who installed 1.26.1 or 1.26.2 to remove them, inspect affected environments, and rotate secrets the code could have accessed. Public sources do not give a verified count of affected organizations or establish exactly how publication access was obtained. A stolen upload credential remains an investigation lead, not a confirmed mechanism.

### Why it matters

The incident shows how even a short-lived malicious release can reach automated builds: installation alone can trigger the payload, with no explicit call to the package's functions. Affected teams need to check exact versions in dependency records and build environments instead of relying on the current PyPI page. For everyone else, it is a concrete supply-chain warning, not proof that every Python project was compromised.
