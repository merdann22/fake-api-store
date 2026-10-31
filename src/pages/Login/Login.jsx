//Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// Запрос к серверу переименован, чтобы не конфликтовать с login из контекста
import { login as loginRequest } from "../../services/api";

export default function Login() {
    // login из контекста: сохраняет токен в состоянии приложения и в localStorage,
    // благодаря этому Header сразу показывает "Корзина" и "Профиль"
    const { login } = useAuth();
    // navigate: программный переход на другую страницу
    const navigate = useNavigate();

    // Управляемые поля формы и текст ошибки
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Срабатывает при отправке формы (кнопка или Enter).
    // async нужен, потому что внутри ждём ответ сервера через await
    const handleSubmit = async (e) => {
        // Отменяем стандартную перезагрузку страницы
        e.preventDefault();
        // Убираем ошибку от прошлой попытки
        setError("");

        // Шаг 1: проверяем пользователей, которых зарегистрировали через нашу форму.
        // DummyJSON о них ничего не знает, поэтому искать их на сервере бесполезно.
        // Если ключа "users" ещё нет, getItem вернёт null, тогда берём пустой массив
        const users = JSON.parse(localStorage.getItem("users")) || [];
        // find возвращает пользователя, у которого совпали и логин, и пароль
        const localUser = users.find(
            (u) => u.username === username && u.password === password
        );

        if (localUser) {
            // Для локального пользователя сервер токен не выдаёт,
            // поэтому генерируем случайный идентификатор как фейковый токен
            login(crypto.randomUUID());
            navigate("/profile");
            // return прерывает функцию, чтобы не отправлять лишний запрос на сервер
            return;
        }

        // Шаг 2: локального пользователя нет, пробуем войти через DummyJSON
        // (подходят только его готовые аккаунты, например emilys / emilyspass)
        try {
            // При неверных данных сервер вернёт ошибку, и выполнение перейдёт в catch
            const data = await loginRequest(username, password);
            // Здесь токен настоящий: accessToken выдал сервер
            login(data.accessToken);
            navigate("/profile");
        } catch (err) {
            // Сюда попадаем при неверных данных или проблемах с сетью
            setError("Неверный логин или пароль");
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                {/* value + onChange: значение хранится в состоянии и обновляется при каждом вводе */}
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Логин"
                />
                {/* type="password" скрывает вводимые символы */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                />
                {/* Ошибка показывается только если она есть */}
                {error && <p>{error}</p>}
                <button type="submit">Войти</button>
            </form>
        </section>
    );
}