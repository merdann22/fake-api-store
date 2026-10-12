import "./PopularProducts.scss";
import {useEffect, useRef, useState} from "react";
import {getProducts} from "../../../../services/api";
import ProductCard from "../../../../components/ProductCard/ProductCard";

const ROWS = 2;             // сколько строк товаров показываем
const CARD_MIN_WIDTH = 220; // минимальная ширина карточки
const GAP = 20;             // отступ между карточками (как в SCSS)

export default function PopularProducts () {

    const [products, setProducts] = useState([]); // все товары с сервера
    const [page, setPage] = useState(1);          // текущая страница
    const [columns, setColumns] = useState(4);    // сколько колонок помещается

    const containerRef = useRef(null); // ссылка на блок с товарами (нужна для ширины)

    // загружаем товары один раз при открытии страницы
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products ?? []);
            } catch (error) {
                console.error("Failed to load products", error);
            }
        }
        loadProducts();
    },[])

    // считаем, сколько колонок помещается в ширину экрана
    useEffect(() => {
        const updateColumns = () => {
            const width = containerRef.current.offsetWidth;
            const count = Math.floor((width + GAP) / (CARD_MIN_WIDTH + GAP));
            setColumns(Math.max(1, count)); // минимум 1 колонка
        };

        updateColumns(); // считаем сразу
        window.addEventListener("resize", updateColumns); // и при изменении окна

        // убираем слушатель, когда компонент исчезает
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    // если колонок стало другое число, возвращаемся на 1-ю страницу
    useEffect(() => {
        setPage(1);
    }, [columns]);

    // товаров на странице = колонки × строки
    const productsPerPage = columns * ROWS;

    const totalPages = Math.ceil(products.length / productsPerPage); // всего страниц
    const startIndex = (page - 1) * productsPerPage;                 // с какого товара начать
    const endIndex = startIndex + productsPerPage;                   // каким закончить
    const productsOnPage = products.slice(startIndex, endIndex);     // товары текущей страницы

    // список номеров страниц: [1, 2, 3, ...]
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <section className="popular-pr">
            <h1>Популярные товары</h1>

            {/* сетка товаров, число колонок задаём из JS */}
            <div
                className="popular-pr__container"
                ref={containerRef}
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
                {productsOnPage.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ))}
            </div>

            {/* кнопки с номерами страниц */}
            <div className="pagination">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={number === page ? "active" : ""}
                        onClick={() => setPage(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </section>
    )
}