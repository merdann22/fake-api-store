import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    // login из контекста: сохраняет токен в состоянии приложения и в localStorage,
    // благодаря этому Header сразу показывает "Корзина" и "Профиль"
    const { login } = useAuth();
    // navigate: программный переход на другую страницу
    const navigate = useNavigate();

    // Управляемые поля формы и текст ошибки
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Срабатывает при отправке формы (кнопка или Enter)
    const handleSubmit = (e) => {
        // Отменяем стандартную перезагрузку страницы
        e.preventDefault();
        // Убираем ошибку от прошлой попытки
        setError("");

        // Достаём список зарегистрированных пользователей из localStorage.
        // localStorage хранит только строки, поэтому JSON.parse превращает строку в массив.
        // Если ключа "users" ещё нет, getItem вернёт null, тогда берём пустой массив
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Проверка уникальности: some возвращает true, если логин уже занят
        if (users.some((u) => u.username === username)) {
            setError("Такой пользователь уже существует");
            // return прерывает функцию, чтобы дубликат не сохранился
            return;
        }

        // Добавляем нового пользователя в массив и сохраняем обратно.
        // JSON.stringify нужен, потому что в localStorage можно записать только строку
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        // Сразу авторизуем пользователя после регистрации.
        // Настоящий токен выдаёт сервер, а у DummyJSON регистрации нет,
        // поэтому генерируем случайный идентификатор как фейковый токен
        login(crypto.randomUUID());
        navigate("/profile");
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                {/* value + onChange: значение хранится в состоянии и обновляется при каждом вводе.
                    required: браузер не даст отправить форму с пустым полем */}
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Логин"
                    required
                />
                {/* type="password" скрывает символы; minLength проверяется браузером до handleSubmit */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                    minLength={6}
                />
                {/* Ошибка показывается только если она есть */}
                {error && <p>{error}</p>}
                <button type="submit">Зарегистрироваться</button>
            </form>
        </section>
    );
}