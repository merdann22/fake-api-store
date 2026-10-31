// useUsers.js — хук загружает пользователей и следит за состоянием загрузки

import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

export function useUsers(limit = 12, skip = 0) {
    const [users, setUsers] = useState([]);       // список пользователей
    const [total, setTotal] = useState(0);        // сколько всего на сервере (для пагинации)
    const [loading, setLoading] = useState(true); // идёт ли загрузка
    const [error, setError] = useState(null);     // текст ошибки, если что-то пошло не так

    // Запрос выполняется при первом рендере и каждый раз, когда меняется limit или skip
    useEffect(() => {
        // Флаг «отменено»: если пользователь ушёл со страницы раньше,
        // чем пришёл ответ — результат не записываем
        let cancelled = false;

        setLoading(true);
        setError(null);

        getUsers({ limit, skip })
            .then((data) => {
                if (cancelled) return;
                setUsers(data.users); // сервер отдаёт объект, массив лежит в поле users
                setTotal(data.total);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        // Функция очистки: React вызовет её перед следующим запросом или при уходе со страницы
        return () => {
            cancelled = true;
        };
    }, [limit, skip]);

    return { users, total, loading, error };
}