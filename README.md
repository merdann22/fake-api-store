# 🛍️ Fake API Store

Интернет-магазин, разработанный на **React** с использованием **Fake Store API**.

🔗 **Demo:** https://fake-api-store-lac.vercel.app/

## 🛠 Техналогии

* React 19
* JavaScript
* SCSS
* Axios
* Fake Store API

## 📦 NPM Packages

Основные библиотеки, используемые в проекте:

* `axios` — запросы к API
* `react-router-dom` — маршрутизация
* `react-icons` — иконки
* `react-loading-skeleton` — Skeleton Loading
* `react-toastify` — уведомления
* `sass` — работа с SCSS
* `swiper` — слайдеры

## 📁 Project Structure

```text
src/
│
├── assets/                         # Изображения и другие ресурсы
│
├── components/                     # Переиспользуемые компоненты
│   │
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.scss
│   │
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.scss
│   │
│   └── ProductCard/
│       ├── ProductCard.jsx
│       └── ProductCard.scss
│
├── context/                        # Глобальное состояние приложения
│   └── CartContext.jsx
│
├── layout/                         # Общая структура страниц
│   ├── Layout.jsx
│   └── Layout.scss
│
├── pages/                          # Страницы приложения
│   │
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.scss
│   │
│   ├── Cart/
│   │   ├── Cart.jsx
│   │   └── Cart.scss
│   │
│   ├── Catalog/
│   │   ├── Catalog.jsx
│   │   └── Catalog.scss
│   │
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.scss
│   │
│   ├── Product/
│   │   ├── Product.jsx
│   │   └── Product.scss
│   │
│   └── Profile/
│       ├── Profile.jsx
│       └── Profile.scss
│
├── router/                         # Настройка маршрутизации
│   └── Router.jsx
│
├── services/                       # Работа с API
│   └── api.js
│
├── styles/                         # Глобальные стили
│   └── global.scss
│
├── App.jsx
├── App.css
├── index.css
└── index.js
```

## 🌐 API

Для получения данных о товарах и категориях используется:

**Fake Store API**

https://fakestoreapi.com/

API-запросы находятся в:

```text
src/services/api.js
```


## ✨ Features

* Получение товаров из API
* Получение категорий из API
* Поиск товаров
* Фильтрация по категориям
* Сортировка товаров
* Просмотр отдельного товара
* Добавление товаров в корзину
* Изменение количества товаров
* Удаление товаров из корзины
* Глобальное состояние корзины через Context API
* Слайдеры товаров
* Skeleton Loading
* Toast-уведомления
* Адаптивная верстка


## 🚀 Installation

Клонировать репозиторий:

```bash
git clone <repository-url>
```

Перейти в папку проекта:

```bash
cd fake-store
```

Установить зависимости:

```bash
npm install
```

Запустить проект:

```bash
npm start
```

После запуска приложение будет доступно локально.

## 📚 Libraries

Установленные основные зависимости проекта:

```text
axios
react-icons
react-loading-skeleton
react-router-dom
react-toastify
sass
swiper
```

## 🎯 Project Purpose

Проект создан для практики и демонстрации навыков разработки интернет-магазина на React с использованием REST API, маршрутизации, Context API, SCSS и сторонних React-библиотек.

## 👨‍💻 Author

**Merdan**

Frontend Developer
