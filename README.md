Базовые штуки для нукст - В САМОМ НИЗУ. 

# Адаптивный Nuxt 3 проект

## Дневник разработки

#### День 1: Инициализация проекта и настройка SCSS

#### Выполнено:
- Создан новый Nuxt 3 проект с TypeScript
- Настроена базовая структура проекта
- Добавлены основные зависимости
- Определена стратегия для SCSS и rem-based адаптива
- создана и подключена база SCSS
- Созданы типы для проекта
- Созданы мок-данные и мок-API
- созданы стартовые файлы для компонентов

#### Принципы работы с rem:
1. Базовый размер: 
   - 10px (1rem = 10px для удобства расчетов)
   - Плавное масштабирование после 1400px через формулу calc(100vw / 1400 * 10)
   - Максимальный размер не ограничен

2. Медиа-запросы:
   - Desktop first подход
   - Брейкпоинты в rem для консистентности:
     * xl: 192rem (1920px)
     * desktop: 140rem (1400px)
     * laptop: 102.4rem (1024px)
     * tablet: 76.8rem (768px)
     * mobile: 32rem (320px)

3. Масштабирование компонентов:
   - Все размеры в rem
   - Использование CSS-переменных для гибкой настройки


#### Следующие шаги:
1. Создание структуры SCSS файлов согласно макету
2. Настройка базовых миксинов для медиа-запросов

#### Технический стек:
- Nuxt 3
- TypeScript
- SCSS
- Адаптивная верстка без UI фреймворков

#### Особенности проекта:
- Строгая типизация TypeScript
- Модульная структура
- Резиновый адаптив через rem на больших разрешениях
- Моковые API endpoints
- Адаптивная верстка согласно макету

#### План следующих шагов:
1. Настройка SCSS и базовых стилей
2. Создание системы масштабирования через rem
3. Настройка моковых API endpoints
4. Имплементация типов для API
5. Создание базовых компонентов
6. Настройка адаптивной верстки

## Установка и запуск



# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
