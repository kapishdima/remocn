# remocn

shadcn registry с готовыми анимациями, переходами и backgrounds для Remotion.

## Что это

Набор production-ready компонентов для создания видео в Remotion. Пользователи устанавливают компоненты через `npx shadcn add remocn/<component>` и собирают видео из готовых блоков.

## Целевая аудитория

Solo builders и маленькие команды (1-2 чел), фронтендер знакомый с экосистемой shadcn. Типичный сценарий: сделали продукт → нужно demo video → берут remocn.

## Архитектура

- **Монорепо:** pnpm workspaces + turborepo
- `apps/web/` — Next.js сайт (landing page + Fumadocs для документации)
- `packages/registry/` — shadcn registry manifest + исходники компонентов

## Два уровня компонентов

- **Primitives** — отдельные анимации, переходы, backgrounds
- **Compositions** — готовые сцены, собранные из primitives

## Ключевые решения

- Плоский namespace: `remocn/fade-in`, `remocn/intro-scene`
- Remotion — prerequisite, не bootstrap'им его
- Own your code (shadcn philosophy) — файлы копируются в проект пользователя
- Все компоненты пишутся с нуля на Remotion API (`useCurrentFrame()`, `interpolate()`, `spring()`)
- Вдохновляемся reactbits.dev идеями, но НЕ копируем код (их лицензия MIT + Commons Clause запрещает порт)
- Превью на сайте через `@remotion/player` — интерактивный плеер в браузере
- Лицензия: MIT

## Бизнес-модель

Open core. Free примитивы и базовые compositions (MIT). В будущем — premium блоки и video builder.

## Команды

```bash
bun install              # установка зависимостей
bun dev                  # запуск dev серверов
bun run build            # сборка всех пакетов
