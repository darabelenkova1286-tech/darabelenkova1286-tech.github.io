# DASHKA WIRE

Личное утреннее издание Дарьи Беленковой: [открыть сайт](https://darabelenkova1286-tech.github.io/).

Здесь лежит опубликованный статический сайт. Редакторский код и черновики находятся в отдельном репозитории `darabelenkova1286-tech/dashka-wire`. Основа проекта — [ADanMan/frontier-wire](https://github.com/ADanMan/frontier-wire), лицензия MIT.

## Утренняя рассылка

Workflow `.github/workflows/morning-delivery.yml` проверяет наличие сегодняшнего выпуска по Москве при публикации и в 08:00, 09:00, 10:00. Если выпуск вышел, отправляет его в подключённые каналы и записывает маркеры `.delivery/`, чтобы повторный запуск не дублировал письмо или сообщение. Почту можно подключить позже: Telegram работает отдельно. До выхода первого выпуска рассылка ничего не отправляет.

Для включения откройте **Settings → Secrets and variables → Actions → New repository secret** и добавьте:

| Secret | Значение |
| --- | --- |
| `SMTP_USER` | Адрес Gmail отправителя |
| `SMTP_PASSWORD` | Пароль приложения Google для этого аккаунта |
| `MAIL_TO` | Адрес получателя |
| `TELEGRAM_BOT_TOKEN` | Новый токен бота после перевыпуска в BotFather |
| `TELEGRAM_CHAT_ID` | Числовой ID личного чата после команды `/start` боту |

Токены и пароли не добавляйте в файлы репозитория или в чат. Telegram можно проверить сразу: **Actions → DASHKA WIRE morning delivery → Run workflow → test_telegram**. Обычный запуск до первого выпуска безопасно ничего не отправляет.
