// api.js
// В этом файле лежат все функции для общения с сервером (API).
// Остальные части приложения (страницы, компоненты) просто импортируют
// отсюда нужную функцию и вызывают её.

import axios from 'axios';

// Адрес сервера. Если он изменится, поправить нужно только здесь.
const API_URL = 'https://dummyjson.com';

// Создаём "настроенный" axios.
// Теперь вместо полного адреса можно писать просто '/products'.
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // если сервер молчит 10 секунд, запрос завершится ошибкой
});


// =====================================================
// ТОВАРЫ (products)
// =====================================================

// Получить все товары.
// limit=0 означает "без ограничения", то есть вернуть все товары сразу.
export const getProducts = async () => {
    const response = await api.get('/products', {
        params: { limit: 0 },
    });

    return response.data;
};

// Получить один товар по его id.
export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);

    return response.data;
};

// Поиск товаров по слову, например searchProducts('phone').
// Через params axios сам правильно подставит слово в адрес
// (пробелы, русские буквы и спецсимволы тоже будут работать).
export const searchProducts = async (query) => {
    const response = await api.get('/products/search', {
        params: { q: query },
    });

    return response.data;
};

// Получить список категорий (массив объектов: slug, name, url).
export const getCategories = async () => {
    const response = await api.get('/products/categories');

    return response.data;
};

// Получить список категорий в виде простых строк: ['beauty', 'laptops', ...].
export const getCategoryList = async () => {
    const response = await api.get('/products/category-list');

    return response.data;
};

// Получить все товары одной категории, например getProductsByCategory('laptops').
export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`, {
        params: { limit: 0 },
    });

    return response.data;
};


// =====================================================
// ПОЛЬЗОВАТЕЛИ (users)
// =====================================================

// Получить всех пользователей.
export const getUsers = async () => {
    const response = await api.get('/users', {
        params: { limit: 0 },
    });

    return response.data;
};

// Получить одного пользователя по id.
export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);

    return response.data;
};

// Поиск пользователей по слову (например, по имени).
export const searchUsers = async (query) => {
    const response = await api.get('/users/search', {
        params: { q: query },
    });

    return response.data;
};


// =====================================================
// КОРЗИНЫ (carts)
// =====================================================

// Получить все корзины.
export const getCarts = async () => {
    const response = await api.get('/carts', {
        params: { limit: 0 },
    });

    return response.data;
};

// Получить одну корзину по id.
export const getCart = async (id) => {
    const response = await api.get(`/carts/${id}`);

    return response.data;
};

// Получить корзины конкретного пользователя.
export const getCartsByUser = async (userId) => {
    const response = await api.get(`/carts/user/${userId}`);

    return response.data;
};


// =====================================================
// АВТОРИЗАЦИЯ (auth)
// =====================================================

// Войти в аккаунт.
// Сервер вернёт данные пользователя и токены (accessToken, refreshToken).
// Токен нужно сохранить, например: localStorage.setItem('token', data.accessToken)
export const login = async (username, password) => {
    const response = await api.post('/auth/login', {
        username,
        password,
    });

    return response.data;
};

// Получить данные текущего пользователя.
// Для этого серверу нужно показать токен, который мы получили при входе.
export const getCurrentUser = async (token) => {
    const response = await api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Обновить токен, когда старый перестал работать.
export const refreshAccessToken = async (refreshToken) => {
    const response = await api.post('/auth/refresh', {
        refreshToken,
    });

    return response.data;
};


// =====================================================
// КАК ИСПОЛЬЗОВАТЬ В КОМПОНЕНТЕ (пример)
// =====================================================
//
// import { useEffect, useState } from 'react';
// import { getProducts } from './api';
//
// function Catalog() {
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState('');
//
//     useEffect(() => {
//         const loadProducts = async () => {
//             try {
//                 const data = await getProducts();
//                 setProducts(data.products); // сами товары лежат в data.products
//             } catch (err) {
//                 setError('Не удалось загрузить товары');
//             }
//         };
//
//         loadProducts();
//     }, []);
//
//     ...
// }