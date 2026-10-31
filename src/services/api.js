// api.js - все запросы к серверу (DummyJSON) собраны в одном месте.
//
// Общее для всех функций ниже:
// - они асинхронные, поэтому вызывать их нужно с await (или через .then);
// - axios кладёт тело ответа в поле data, поэтому мы достаём его через
//   деструктуризацию { data } и возвращаем наружу только его;
// - при ошибке (сеть, 4xx, 5xx) axios выбрасывает исключение, его ловите
//   в месте вызова через try/catch.

import axios from 'axios';

const API_URL = 'https://dummyjson.com';

// Свой экземпляр axios с общими настройками:
// baseURL добавляется ко всем путям, timeout обрывает запрос, если сервер молчит 10 сек
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// По умолчанию DummyJSON отдаёт только 30 записей; limit: 0 снимает это ограничение
const ALL = { limit: 0 };


// ---------- Товары ----------

// Ответ: { products: [...], total, skip, limit }
export const getProducts = async () => {
    const { data } = await api.get('/products', { params: ALL });
    return data;
};

// Один товар по id, ответ: объект товара
export const getProduct = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

// Поиск по слову (q), ответ в том же формате, что и у getProducts
export const searchProducts = async (query) => {
    const { data } = await api.get('/products/search', { params: { q: query } });
    return data;
};

// Категории как объекты: [{ slug, name, url }]. Подходит для отображения названий
export const getCategories = async () => {
    const { data } = await api.get('/products/categories');
    return data;
};

// Категории как массив slug-строк: ['beauty', 'laptops', ...]. Подходит для ссылок и фильтров
export const getCategoryList = async () => {
    const { data } = await api.get('/products/category-list');
    return data;
};

// Товары одной категории; category это slug (например, 'laptops')
export const getProductsByCategory = async (category) => {
    const { data } = await api.get(`/products/category/${category}`, { params: ALL });
    return data;
};


// ---------- Пользователи ----------

// Постраничная загрузка: limit - размер страницы, skip - сколько записей пропустить.
// Формула для страницы N: skip = (N - 1) * limit (страница 3 по 12 → skip: 24).
// Без аргументов вернёт первые 12.
export const getUsers = async ({ limit = 12, skip = 0 } = {}) => {
    const { data } = await api.get('/users', { params: { limit, skip } });
    return data; // { users: [...], total: 208, skip, limit }; total нужен для расчёта числа страниц
};

// Один пользователь по id
export const getUser = async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
};

// Поиск по имени, email, городу и т.д.; формат ответа как у getUsers
export const searchUsers = async (query) => {
    const { data } = await api.get('/users/search', { params: { q: query } });
    return data;
};


// ---------- Корзины ----------

export const getCarts = async () => {
    const { data } = await api.get('/carts', { params: ALL });
    return data;
};

export const getCart = async (id) => {
    const { data } = await api.get(`/carts/${id}`);
    return data;
};

// Корзины конкретного пользователя (по id из getUser / данных логина)
export const getCartsByUser = async (userId) => {
    const { data } = await api.get(`/carts/user/${userId}`);
    return data;
};


// ---------- Авторизация ----------

// Вход по логину и паролю. Ответ: данные пользователя + accessToken и refreshToken.
// accessToken живёт недолго и нужен для защищённых запросов, refreshToken - для его обновления.
// Для тестов подойдёт пара emilys / emilyspass.
// Имя совпадает с login из AuthContext, поэтому при импорте переименуйте:
// import { login as loginRequest } from './services/api'
export const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
};

// Данные того, кто вошёл. Сервер определяет пользователя по токену,
// который передаётся в заголовке Authorization в формате "Bearer <токен>"
export const getCurrentUser = async (token) => {
    const { data } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

// Обмен refreshToken на новый accessToken, когда срок жизни старого истёк
export const refreshAccessToken = async (refreshToken) => {
    const { data } = await api.post('/auth/refresh', { refreshToken });
    return data;
};