// HitProducts.jsx - слайдер с товарами, у которых самый высокий рейтинг

import "./HitProducts.scss";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getProducts } from "../../../../services/api";

// Стили Swiper подключаются отдельно: базовые и для точек пагинации
import "swiper/css";
import "swiper/css/pagination";

// Сколько товаров показывать и с какого рейтинга считать товар хитом
const HITS_COUNT = 6;
const MIN_RATING = 4.5;

export default function HitProducts() {
    const [products, setProducts] = useState([]);

    // Пустой массив зависимостей [] - эффект выполнится один раз, при монтировании
    useEffect(() => {
        getProducts()
            // ?? [] подстраховывает, если в ответе нет поля products
            .then((data) => setProducts(data.products ?? []))
            .catch((error) => console.error("Failed to load products", error));
    }, []);

    // useMemo запоминает результат и пересчитывает его только при изменении products,
    // а не при каждой перерисовке компонента.
    // Порядок важен: сначала отсеиваем по рейтингу, затем сортируем, затем обрезаем.
    // Сортировка безопасна для исходного массива, потому что filter уже создал его копию
    const hits = useMemo(
        () =>
            products
                .filter((p) => p.rating >= MIN_RATING)
                .sort((a, b) => b.rating - a.rating) // b - a: от большего рейтинга к меньшему
                .slice(0, HITS_COUNT),
        [products]
    );

    // Возврат null значит "ничего не отрисовывать": пока товары грузятся
    // (или хитов нет), секция не занимает место на странице
    if (hits.length === 0) return null;

    return (
        <section className="hit-pr">
            <Swiper
                // Swiper подключает только указанные модули, чтобы не тянуть лишний код
                modules={[Autoplay, Pagination]}
                // clickable: по точкам можно переключать слайды
                pagination={{ clickable: true }}
                // Зацикливание включаем только при достаточном числе слайдов,
                // иначе loop в Swiper работает некорректно
                loop={hits.length > 2}
                autoplay={{
                    delay: 5000, // пауза между слайдами, мс
                    pauseOnMouseEnter: true, // при наведении мыши автопрокрутка останавливается
                    disableOnInteraction: false, // после ручного переключения автопрокрутка продолжается
                }}
                spaceBetween={20} // отступ между слайдами, px
            >
                {/* index используем только для номера в заголовке, а key берём из id товара */}
                {hits.map((product, index) => (
                    <SwiperSlide className="hit-pr__slide" key={product.id}>
                        <div className="hit-pr__container">
                            <div className="hit-pr__title">
                                {/* h2 вместо h1: главный заголовок на странице должен быть один */}
                                <h2>Hit products #{index + 1}</h2>
                                <p>Rating - {product.rating}</p>
                                <Link to={`/product/${product.id}`} className="hit-pr__btn">
                                    Open product
                                </Link>
                            </div>

                            {/* loading="lazy": браузер грузит картинку, только когда она近 к области видимости */}
                            <img src={product.thumbnail} alt={product.title} loading="lazy" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}