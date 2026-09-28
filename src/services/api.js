import axios from 'axios'; // Подключаем Axios для отправки запросов к API

const API_URL = 'https://dummyjson.com'; // Базовый адрес API

const api = axios.create({
    baseURL: API_URL,
});


// Products

// Получить все товары
export const getProducts = async () => {
    const response = await api.get('/products?limit=0');

    return response.data;
};

// Получить товар по ID
export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);

    return response.data;
};

// Поиск товаров
export const searchProducts = async (query) => {
    const response = await api.get(`/products/search?q=${query}`);

    return response.data;
};

// Получить список категорий
export const getCategories = async () => {
    const response = await api.get('/products/categories');

    return response.data;
};

// Получить список категорий в виде строк
export const getCategoryList = async () => {
    const response = await api.get('/products/category-list');

    return response.data;
};

// Получить товары определённой категории
export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`);

    return response.data;
};

// Получить товары категории без ограничения количества
export const getAllProductsByCategory = async (category) => {
    const response = await api.get(
        `/products/category/${category}?limit=0`
    );

    return response.data;
};


// Users

// Получить всех пользователей
export const getUsers = async () => {
    const response = await api.get('/users?limit=0');

    return response.data;
};

// Получить пользователя по ID
export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);

    return response.data;
};

// Поиск пользователей
export const searchUsers = async (query) => {
    const response = await api.get(`/users/search?q=${query}`);

    return response.data;
};


// Carts

// Получить все корзины
export const getCarts = async () => {
    const response = await api.get('/carts?limit=0');

    return response.data;
};

// Получить корзину по ID
export const getCart = async (id) => {
    const response = await api.get(`/carts/${id}`);

    return response.data;
};

// Получить корзины пользователя
export const getCartsByUser = async (userId) => {
    const response = await api.get(`/carts/user/${userId}`);

    return response.data;
};


// Authentication

// Авторизация
export const login = async (username, password) => {
    const response = await api.post('/auth/login', {
        username,
        password,
    });

    return response.data;
};

// Получить текущего пользователя
export const getCurrentUser = async (token) => {
    const response = await api.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Обновить токен
export const refreshToken = async (refreshToken) => {
    const response = await api.post('/auth/refresh', {
        refreshToken,
    });

    return response.data;
};
