---
date: 2026-11-17
rubric: ai
title_ru: Команда Domyn адаптирует суперкомпьютер Jupiter для обучения модели почти на триллион параметров
title_en: Domyn adapts the Jupiter supercomputer for near-trillion-parameter model training
dek_ru: Исследователи описали экспериментальную конфигурацию и рост пропускной способности; обучение открытой модели ещё продолжается.
dek_en: Researchers describe an experimental setup and higher throughput; training of the planned open model is still in progress.
source: https://t.me/anti_agi/2309
primary_source: https://www.domyn.com/blog/training-1t-moe-eu-public-infrastructure-pytorch
primary_verified: true
generated: true
---

## Русская версия

Двенадцатого ноября исследовательская команда Domyn [опубликовала технический разбор](https://www.domyn.com/blog/training-1t-moe-eu-public-infrastructure-pytorch) подготовки европейского суперкомпьютера Jupiter к обучению большой языковой модели. История попала в сегодняшнюю подборку через `anti_agi`; дата первичного материала указана отдельно. Проект EUROPA ведут Domyn вместе с Fraunhofer IAIS и Fraunhofer IIS в рамках European Frontier AI Grand Challenge. Его цель — создать открытую модель и впоследствии выпустить веса и инструкции по обучению. Публикация описывает настройку системы, а не завершённое обучение или уже доступные веса.

Экспериментальная архитектура содержит около 951,9 миллиарда параметров в сумме, но активирует примерно 32,8 миллиарда на каждый токен. Это модель типа «смесь экспертов»: она выбирает часть специализированных блоков для конкретного шага, поэтому общее число параметров не равно вычислениям на каждом ответе. Для опытов использованы 96 узлов Jupiter с 384 ускорителями GH200. Система общего пользования изначально проектировалась для научных расчётов, а не как выделенный кластер обучения ИИ.

Главной трудностью, по словам авторов, стала передача данных между узлами и ограничение памяти, а не арифметическая мощность ускорителей. После изменений в распараллеливании и программном стеке команда сообщает о росте пропускной способности с примерно 90 до 1293 токенов в секунду на один GPU в измеренном режиме. Авторы предупреждают, что конфигурация продолжает меняться. Эти числа относятся к конкретному эксперименту и не являются оценкой качества будущей модели на пользовательских задачах.

### Почему это важно

Проект показывает, как общедоступную европейскую вычислительную инфраструктуру можно приспосабливать к крупному обучению без отдельного специализированного кластера. Практический итог будет понятен позднее, когда команда завершит обучение, опубликует веса и независимые исследователи смогут повторить измерения. Пока проверяемый результат — опубликованная инженерная методика и измеренная производительность опытной конфигурации.

## English version

On November 12, Domyn's technical team [published a detailed account](https://www.domyn.com/blog/training-1t-moe-eu-public-infrastructure-pytorch) of preparing Europe's Jupiter supercomputer to train a large language model. The story entered today's selection through `anti_agi`; the original publication date is stated separately. The EUROPA project brings Domyn together with Fraunhofer IAIS and Fraunhofer IIS under the European Frontier AI Grand Challenge. Its goal is an open model with released weights and training recipes. This post describes system preparation, not completed training or weights already available to developers.

The experimental design has approximately 951.9 billion total parameters but activates about 32.8 billion per token. As a mixture-of-experts model, it selects a subset of specialized components for each step; its total parameter count is not the amount of computation used for every response. The team ran experiments on 96 Jupiter nodes containing 384 GH200 accelerators. Jupiter is shared public infrastructure originally optimized for scientific workloads, rather than a dedicated AI training cluster.

The authors say inter-node communication and memory constraints were harder than raw accelerator arithmetic. Changes to parallelism and the software stack increased measured throughput from roughly 90 to 1,293 tokens per second per GPU in the reported setup. They also warn that the configuration is still changing. These figures describe a particular engineering experiment, not the future model's quality on real user tasks.

### Why it matters

The project explores how public European computing infrastructure can support large model training without a purpose-built private cluster. Its practical outcome will become clearer after training finishes, weights are released, and independent teams can reproduce results. For now, the verifiable result is a published engineering method and measured throughput in an experimental configuration.
