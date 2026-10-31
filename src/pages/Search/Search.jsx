// Search.jsx - страница поиска. Запрос хранится в URL (?q=...),
// поэтому результаты можно открыть по ссылке и вернуться к ним кнопкой «назад»

import "./Search.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../../services/api";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Search() {
    // params - объект с параметрами адресной строки, setParams - функция для их изменения
    // (изменение URL не перезагружает страницу, но перерисовывает компонент)
    const [params, setParams] = useSearchParams();
    // Для /search?q=phone вернёт "phone"; если параметра нет, будет пустая строка
    const query = params.get("q") ?? "";

    // value - то, что пользователь печатает; query - то, что реально ищется.
    // Они разделены, чтобы поиск не запускался на каждую набранную букву
    const [value, setValue] = useState(query);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Синхронизация поля с URL: нужна, когда query меняется не через форму
    // (кнопка «назад», переход по ссылке), иначе в поле останется старый текст
    useEffect(() => {
        setValue(query);
    }, [query]);

    // Отправка формы (Enter): кладём запрос в URL, а сам поиск запустит эффект ниже
    const handleSubmit = (e) => {
        e.preventDefault();
        const q = value.trim(); // обрезаем пробелы по краям
        if (q) setParams({ q }); // пустой запрос игнорируем
    };

    // Поиск запускается при каждом изменении query
    useEffect(() => {
        // Нет запроса - очищаем результаты и не ходим на сервер
        if (!query) {
            setProducts([]);
            return;
        }

        // Защита от «гонки» запросов: если пользователь успел начать новый поиск,
        // ответ на предыдущий придёт позже и не должен перезаписать свежие результаты
        let ignore = false;

        setLoading(true);
        searchProducts(query)
            .then((data) => {
                // ?? [] подстраховывает, если в ответе нет поля products
                if (!ignore) setProducts(data.products ?? []);
            })
            .catch((error) => console.error("Search failed", error))
            // finally срабатывает и при успехе, и при ошибке, чтобы загрузка не «зависла»
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        // Функция очистки: React вызывает её перед следующим запуском эффекта
        // или при уходе со страницы - так старый ответ помечается как устаревший
        return () => {
            ignore = true;
        };
    }, [query]);

    // Выбор того, что показать под формой: загрузка / пусто / сетка карточек
    let content;
    if (loading) {
        content = <p>Загрузка...</p>;
    } else if (products.length === 0) {
        content = <p>Ничего не найдено</p>;
    } else {
        content = (
            <div className="pr-grid">
                {/* key нужен React, чтобы отличать элементы списка друг от друга */}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    }

    return (
        <section className="search">
            <form className="search__input" onSubmit={handleSubmit}>
                {/* Управляемое поле: значение хранится в состоянии value */}
                <input
                    type="search"
                    placeholder="Поиск товаров..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>

            {/* Блок результатов показываем только если есть запрос,
                иначе при первом заходе было бы «Ничего не найдено» */}
            {query && <div className="search__container">{content}</div>}
        </section>
    );
}