// PopularProducts.jsx - сетка товаров с постраничной навигацией.
// Число колонок подстраивается под ширину экрана.

import "./PopularProducts.scss";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../../../services/api";
import ProductCard from "../../../../components/ProductCard/ProductCard";

const ROWS = 2;             // строк на странице
const CARD_MIN_WIDTH = 220; // минимальная ширина карточки, px
const GAP = 20;             // отступ между карточками, px (должен совпадать с SCSS, иначе расчёт колонок собьётся)

export default function PopularProducts() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    // 4 - стартовое значение до первого замера ширины контейнера
    const [columns, setColumns] = useState(4);

    // Ссылка на DOM-элемент контейнера: через неё читаем его реальную ширину.
    // useRef не вызывает перерисовку при изменении, в отличие от useState
    const containerRef = useRef(null);

    // Пустой массив зависимостей [] - эффект выполнится один раз, при монтировании
    useEffect(() => {
        getProducts()
            // ?? [] подстраховывает, если в ответе нет поля products
            .then((data) => setProducts(data.products ?? []))
            .catch((error) => console.error("Failed to load products", error));
    }, []);

    // Подсчёт колонок под ширину контейнера
    useEffect(() => {
        const updateColumns = () => {
            // ?. и ?? защищают от случая, когда элемент ещё не отрисован
            const width = containerRef.current?.offsetWidth ?? 0;
            // Сколько карточек минимальной ширины с отступами помещается в ряд.
            // Прибавляем GAP к ширине, потому что после последней карточки отступа нет
            const count = Math.floor((width + GAP) / (CARD_MIN_WIDTH + GAP));
            // Колонок не может быть меньше одной
            setColumns(Math.max(1, count));
        };

        // Первый расчёт сразу, дальше - при каждом изменении размера окна
        updateColumns();
        window.addEventListener("resize", updateColumns);
        // Очистка: убираем слушатель при размонтировании, чтобы не было утечки
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    // От числа колонок зависит размер страницы, поэтому при его смене
    // текущий номер страницы теряет смысл - возвращаемся на первую
    useEffect(() => {
        setPage(1);
    }, [columns]);

    // Пагинация считается прямо при рендере, отдельное состояние для неё не нужно
    const perPage = columns * ROWS;
    const totalPages = Math.ceil(products.length / perPage);
    // Индекс первого товара страницы: страница 2 при perPage=8 → start=8
    const start = (page - 1) * perPage;
    // slice вырезает нужный кусок массива, не изменяя сам массив
    const productsOnPage = products.slice(start, start + perPage);

    // Создаёт массив нужной длины и заполняет его номерами: [1, 2, 3, ...]
    // (_ - неиспользуемое значение элемента, нужен только индекс i)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <section className="popular-pr">
            <h1>Popular products</h1>

            {/* Число колонок меняется динамически, поэтому задано инлайн-стилем;
                minmax(0, 1fr) не даёт широкому содержимому растягивать колонки */}
            <div
                className="popular-pr__container"
                ref={containerRef}
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
                {/* key нужен React, чтобы отличать элементы списка друг от друга */}
                {productsOnPage.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>

            {/* Если страница одна, кнопки не нужны */}
            {totalPages > 1 && (
                <div className="pagination">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            // Подсвечиваем кнопку текущей страницы
                            className={number === page ? "active" : ""}
                            onClick={() => setPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}