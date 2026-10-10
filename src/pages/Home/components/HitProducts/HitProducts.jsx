import "./HitProducts.scss";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HitProducts() {
// Состояние компонента: список всех товаров.
// products - текущее значение, setProducts - функция для его изменения.
// Изначально массив пустой, потому что данные ещё не загружены.
// Когда вызывается setProducts, React перерисовывает компонент.
    const [products, setProducts] = useState([]);

// useEffect выполняет код "побочных эффектов" (запросы к серверу и т.п.)
// уже ПОСЛЕ того, как компонент первый раз отрисовался на экране.
    useEffect(() => {

        // Внутри useEffect нельзя сделать саму функцию async,
        // поэтому создаём отдельную асинхронную функцию и вызываем её ниже.
        const loadProducts = async () => {

            try {
                // Запрашиваем товары с API. await ждёт ответа,
                // пока он не придёт, код дальше не идёт.
                const data = await getProducts();

                // Сохраняем товары в состояние.
                // data.products ?? [] значит: если data.products равен
                // undefined или null, подставь пустой массив [].
                // Так дальше не будет ошибки при вызове .filter().
                setProducts(data.products ?? []);
            } catch (error) {
                // Если что-то пошло не так, выводим ошибку в консоль.
                // Состояние остаётся пустым, компонент просто ничего не покажет.
                console.error("Failed to load products", error);
            }
        };

        loadProducts();

// Пустой массив зависимостей [] означает: выполнить эффект
// только один раз, при первом появлении компонента на странице.
    }, []);

// useMemo запоминает результат вычисления и пересчитывает его
// только когда изменились значения из массива зависимостей [products].
// Без него фильтрация и сортировка выполнялись бы при каждой перерисовке.
    const hits = useMemo(
        () =>
            products
                // 1. Оставляем только товары с рейтингом 4.5 и выше.
                //    filter возвращает НОВЫЙ массив, исходный products не меняется.
                .filter(p => p.rating >= 4.5)

                // 2. Сортируем по убыванию рейтинга: лучшие товары идут первыми.
                //    Если b.rating - a.rating больше нуля, b ставится перед a.
                //    sort меняет массив, на котором вызван, но это уже копия
                //    после filter, так что products остаётся нетронутым.
                .sort((a, b) => b.rating - a.rating)

                // 3. Берём первые 6 товаров (с индекса 0 до 6, не включая 6).
                .slice(0, 6),

        // Пересчитывать hits, только если изменился products.
        [products]
    );

// Если хитовых товаров нет (данные ещё грузятся, произошла ошибка
// или ни у одного товара нет рейтинга 4.5+), компонент ничего не рисует.
// null в React означает "не выводить ничего".
// Это также защищает Swiper от инициализации с пустым списком слайдов.
    if (hits.length === 0) return null;

    return (
        <section className="hit-pr">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                loop={hits.length > 2}
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                spaceBetween={20}
            >
                {hits.map((product, index) => (
                    <SwiperSlide className="hit-pr__slide" key={product.id}>
                        <div className="hit-pr__container">
                            <div className="hit-pr__title">
                                <h1>Hit products #{index + 1}</h1>
                                <h2>Rating - {product.rating}</h2>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="hit-pr__btn"
                                >
                                    Open product
                                </Link>
                            </div>

                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}