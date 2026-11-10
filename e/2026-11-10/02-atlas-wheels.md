---
date: 2026-11-10
rubric: physical_ai
title_ru: Зачем Boston Dynamics поставила Atlas на колеса
title_en: Why Boston Dynamics put wheels on Atlas
dek_ru: Колесный Atlas — исследовательский стенд для проверки двигателей и переноса поведения из симуляции на реального робота.
dek_en: Wheeled Atlas is a research testbed for motor control and transferring simulated behavior to a physical robot.
source: https://t.me/alfa_trends/1649
primary_source: https://bostondynamics.com/blog/atlas-on-a-roll/
primary_verified: true
via: Новости из ТГ Альфы
generated: true
---

## Русская версия

Boston Dynamics [показала Atlas с колесами вместо стоп](https://bostondynamics.com/blog/atlas-on-a-roll/). Это сообщение заметили в Telegram-канале «Альфа Тренды»; перед вами **новости из ТГ Альфы** с проверкой по публикации самой лаборатории. Инженер команды Atlas Сяоюй Энди У объясняет: цель опыта состояла не в создании нового транспортного робота, а в проверке приводов, низкоуровневого управления моторами и алгоритма, который координирует движения всего тела.

Для переделки команда изготовила один тип переходника, крепящий обод обычного самокатного колеса к существующему приводу голеностопа. Остальные части механизма, по ее описанию, менять не пришлось. В программной модели колесо представили как сустав, способный непрерывно вращаться. Такая схема заставляет моторы долго работать под нагрузкой и проходить разные сочетания скорости и крутящего момента при разгоне, повороте и торможении.

Робот выполнил боковые рывки и прыжок с разворотом на 360 градусов. Часть движений исходила из записей человеческих движений, а управление обучалось и подстраивалось в симуляции. Для исследователей важна не зрелищность трюка, а совпадение расчетного поведения с тем, что может исполнить реальный механизм. Если симулятор слишком идеализирует моторы, обученная политика может требовать от робота невозможного.

### Почему это важно

Колеса сделали разрыв между симуляцией и физическим миром заметнее и измеримее. Такая проверка полезна для надежности будущих роботов, которые должны продолжать работать за пределами лаборатории. Boston Dynamics прямо называет колесный Atlas исследовательским стендом, а не продуктом. Из этой демонстрации нельзя делать вывод о скором выпуске колесного гуманоидного курьера.

## English version

Boston Dynamics [has shown Atlas with wheels in place of its feet](https://bostondynamics.com/blog/atlas-on-a-roll/). The story was spotted through the Alfa Trends Telegram channel; the account here follows the robotics company's own engineering post. Atlas controls engineer Xiaoyu “Andy” Wu says the objective was to test actuators, low-level motor control, and the learned controller coordinating the whole body. It was not an attempt to announce a new transport product.

The team made a custom adapter to mount an ordinary scooter rim onto Atlas's existing ankle actuator. According to Wu, this was the only new mechanical part. In software, each wheel was modeled as an ankle that can rotate continuously. Rolling gives the motors sustained loads across different combinations of speed and torque during starts, turns, and stops.

The robot performed side dashes and a jump with a full 360-degree turn. Some motions came from human motion-capture recordings, while the controller was trained and tuned in simulation. The useful result is not the spectacle of the stunt. It is whether a behavior learned in a virtual model still works on the real machine. A simulator that treats motors as too ideal can teach a policy to demand movements the physical hardware cannot deliver.

### Why it matters

Wheels made the gap between simulated and physical behavior easier to stress-test. That kind of work informs reliability in robots operating beyond the lab. Boston Dynamics explicitly calls wheeled Atlas a research testbed, not a product. The demonstration is no evidence of an imminent wheeled humanoid delivery service.
