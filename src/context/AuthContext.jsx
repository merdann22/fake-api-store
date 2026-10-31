// Импортируем три инструмента из самого React:
// createContext - создаёт "общее хранилище" данных, доступное во всём дереве компонентов
// useContext    - позволяет компоненту прочитать данные из такого хранилища
// useState      - хранит состояние компонента (при его изменении React перерисовывает компонент)
import { createContext, useContext, useState } from "react";

// Создаём сам контекст. Это пустая "коробка", в которую провайдер ниже положит данные.
// null - значение по умолчанию: его получит компонент, который находится
// ВНЕ <AuthProvider>. Именно из-за него вы видели ошибку
// "Cannot destructure property 'isLoggedIn' of ... as it is null".
const AuthContext = createContext(null);

// AuthProvider - компонент-обёртка. Он хранит данные авторизации
// и раздаёт их всем вложенным компонентам.
// Проп children - это всё, что вы вложите внутрь <AuthProvider>...</AuthProvider>
// (в index.js это <App />).
export function AuthProvider({ children }) {

    // Состояние токена:
    // token    - строка с токеном, если пользователь вошёл, или null, если нет
    // setToken - функция, которой мы меняем токен
    //
    // useState(() => ...) - "ленивая инициализация": функция выполнится только
    // один раз, при первом рендере. Она достаёт токен из localStorage
    // (хранилище браузера, которое переживает перезагрузку страницы),
    // поэтому после обновления страницы пользователь остаётся залогиненным.
    // Если токена в localStorage нет, getItem вернёт null.
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    // Вход в аккаунт. Вызывается со страницы Login после успешного ответа сервера.
    // newToken - токен, который вернул сервер (data.accessToken).
    const login = (newToken) => {
        // 1. Сохраняем токен в браузере, чтобы он не пропал после перезагрузки
        localStorage.setItem("token", newToken);
        // 2. Обновляем состояние, чтобы React перерисовал компоненты
        //    (например, Header покажет "Корзина" и "Профиль" вместо "Логин")
        setToken(newToken);
    };

    // Выход из аккаунта. Делает то же самое, но в обратную сторону.
    const logout = () => {
        // Удаляем токен из браузера
        localStorage.removeItem("token");
        // Сбрасываем состояние: isLoggedIn станет false, интерфейс обновится
        setToken(null);
    };

    return (
        // Provider кладёт в контекст объект value.
        // Любой компонент внутри провайдера сможет получить его через useAuth().
        <AuthContext.Provider
            value={{
                // !!token превращает значение в boolean:
                // строка с токеном -> true, null -> false.
                // Отдельно хранить isLoggedIn не нужно, он всегда выводится из токена.
                isLoggedIn: !!token,

                // Сам токен, пригодится для запросов к API, требующих авторизации
                // (например, заголовок Authorization: Bearer <token>)
                token,

                // Функции входа и выхода, объявленные выше
                login,
                logout,
            }}
        >
            {/* Здесь отрисовывается всё вложенное содержимое (<App /> и всё, что внутри) */}
            {children}
        </AuthContext.Provider>
    );
}

// Собственный хук для удобства.
// Вместо того чтобы в каждом файле импортировать useContext и AuthContext,
// достаточно написать: const { isLoggedIn, login, logout } = useAuth();
// useContext(AuthContext) возвращает ровно тот объект, который мы передали в value.
// Работает только в компонентах внутри <AuthProvider>, иначе вернёт null.
export const useAuth = () => useContext(AuthContext);