import axios from 'axios'; // Подключаем Axios для отправки запросов к API

const API_URL = 'https://fakestoreapi.com'; // Сохраняем базовый адрес API

const api = axios.create({
    baseURL: API_URL, // Указываем базовый URL для всех запросов
});


// Products

export const getProducts = async () => {    // запрос к серверу
    const response = await api.get('/products'); // Получаем все товары
    return response.data; // Возвращаем данные товаров
};

export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`); // Получаем товар по его ID
    return response.data; // Возвращаем данные товара
};

export const getCategories = async () => {
    const response = await api.get('/products/categories'); // Получаем список категорий
    return response.data; // Возвращаем категории
};

export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`); // Получаем товары выбранной категории
    return response.data; // Возвращаем найденные товары
};


// Users

export const getUsers = async () => {
    const response = await api.get('/users'); // Получаем список пользователей
    return response.data; // Возвращаем пользователей
};

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}`); // Получаем пользователя по ID
    return response.data; // Возвращаем данные пользователя
};


// Carts

export const getCarts = async () => {
    const response = await api.get('/carts'); // Получаем все корзины
    return response.data; // Возвращаем корзины
};

export const getCart = async (id) => {
    const response = await api.get(`/carts/${id}`); // Получаем корзину по ID
    return response.data; // Возвращаем данные корзины
};