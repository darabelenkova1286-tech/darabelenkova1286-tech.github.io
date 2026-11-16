---
date: 2026-11-16
rubric: ai
title_ru: Alibaba выпустила Qwen4-Max с контекстом в миллион токенов
title_en: Alibaba releases Qwen4-Max with a million-token context window
dek_ru: Новая флагманская модель доступна через QwenCloud; заявления о превосходстве и экономии основаны на тестах производителя.
dek_en: The flagship model is available through QwenCloud; performance and cost claims come from the company's own evaluations.
source: https://t.me/xor_journal/10515
primary_source: https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max
primary_verified: true
generated: true
---

## Русская версия

Alibaba Cloud [объявила 16 ноября](https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max) о выпуске Qwen4-Max. Повод заметили в `xor_journal`, а параметры мы сверили с заявлением разработчика. Компания называет модель самой мощной в семействе Qwen на сегодня. У неё нативная работа с изображениями и контекстное окно до миллиона токенов. Модель доступна через QwenCloud по Token Plan и API, а также в сервисах QwenWork и QwenStudio.

Архитектура описана как смесь экспертов: всего 2,4 триллиона параметров, но на каждый токен активируется около 71 миллиарда. Это не означает, что все параметры участвуют в каждом ответе. Alibaba связывает такой подход с меньшими вычислительными затратами по сравнению с прежней Qwen3.8-Max. Компания сообщает о шестом месте в рейтинге Code Arena и о сильных результатах на наборах заданий для агентов, работы с документами и визуального рассуждения.

Заявленные 35% экономии токенов и примерно 60% снижения средней стоимости задачи относятся к собственному тесту Work360 в режиме High effort. Это не универсальная скидка для всех пользователей. В пресс-релизе отдельно указана цена $0,075 за миллион входных токенов при попадании в неявный кэш; такую цену нельзя применять к каждому запросу без уточнения условий кэширования. Младшие модели серии с открытыми весами компания лишь обещает выпустить позднее.

### Почему это важно

Модель сочетает длинный контекст, мультимодальный ввод и доступ через API — набор, востребованный в рабочих агентах. Но практическая ценность зависит от конкретной задачи, задержки, полной цены входных и выходных токенов и воспроизводимости тестов. На дату выпуска подтверждены доступность Qwen4-Max и заявленные технические характеристики; сравнения с конкурентами следует проверять отдельно.

## English version

Alibaba Cloud [announced Qwen4-Max on November 16](https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max). The story was spotted via `xor_journal`, and the specifications were checked against Alibaba's release. The company calls it the Qwen family's most capable model so far. It supports native visual input and a context window of up to one million tokens. It is available through QwenCloud's Token Plan and API, and in QwenWork and QwenStudio.

Alibaba describes the architecture as a mixture of experts with 2.4 trillion total parameters, while roughly 71 billion are activated per token. That does not mean every parameter participates in every answer. The company links the design to lower inference costs than its previous Qwen3.8-Max. It reports a sixth-place Code Arena ranking and strong results in tests of agent workflows, workplace tasks, and visual reasoning.

The quoted 35% reduction in token use and roughly 60% lower average cost per task come from Alibaba's own Work360 evaluation at High reasoning effort. They are not a blanket price cut for every workload. The release also lists $0.075 per million input tokens for implicit cache hits; that conditional figure should not be treated as the price of every request. Smaller open-weight Qwen4 models are promised for a later date.

### Why it matters

Long context, multimodal input, and API access make this a relevant model for workplace agents. Its practical value will depend on a specific task, latency, full input and output pricing, and independently repeatable results. Today's confirmed milestone is the model's release and Alibaba's published specifications; claims of superiority over rivals require separate scrutiny.
