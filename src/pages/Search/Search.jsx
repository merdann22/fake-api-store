import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchProducts } from "../../services/api"; // функция запроса к API
import ProductCard from "../../components/ProductCard/ProductCard"; // карточка товара
import "./Search.scss";

function Search() {
    // useSearchParams читает параметры из адресной строки (?q=...)
    const [params] = useSearchParams();
    const query = params.get("q") || ""; // поисковый запрос из URL, если его нет - пустая строка

    // useState хранит данные, при изменении которых компонент перерисовывается
    const [products, setProducts] = useState([]); // найденные товары
    const [loading, setLoading] = useState(false); // идёт ли сейчас загрузка
    const [value, setValue] = useState(query); // текст в поле ввода

    // useNavigate позволяет менять адрес страницы из кода
    const navigate = useNavigate();

    // Срабатывает при отправке формы (Enter)
    const handleSubmit = (e) => {
        e.preventDefault(); // отменяем перезагрузку страницы
        const q = value.trim(); // убираем пробелы по краям
        // encodeURIComponent безопасно кодирует спецсимволы для URL
        if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
    };

    // useEffect выполняется после рендера и при каждом изменении query (см. [query] внизу)
    useEffect(() => {
        // Если запроса нет, очищаем результаты и выходим
        if (!query) {
            setProducts([]);
            return;
        }
        setLoading(true); // показываем «Загрузка...»
        searchProducts(query) // отправляем запрос на сервер
            .then((data) => setProducts(data.products)) // сохраняем товары из ответа
            .finally(() => setLoading(false)); // выключаем загрузку в любом случае
    }, [query]);

    // Пока идёт загрузка, показываем только текст
    if (loading) return <p>Загрузка...</p>;

    return (
        <section className="search">
            {/* Форма поиска */}
            <form className="search__input" onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Поиск товаров..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)} // обновляем value при вводе
                />
            </form>

            {/* Результаты показываем только если есть запрос */}
            {query && (
                <div className="search__container">
                    {/* Если товаров нет - сообщение, иначе - сетка карточек */}
                    {products.length === 0 ? (
                        <p>Ничего не найдено</p>
                    ) : (
                        <div className="pr-grid">
                            {/* map превращает каждый товар в карточку; key нужен React для списков */}
                            {products.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export default Search;