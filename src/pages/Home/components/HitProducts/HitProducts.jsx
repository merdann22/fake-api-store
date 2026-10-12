import "./HitProducts.scss";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HitProducts() {
    const [products, setProducts] = useState([]); // все товары с сервера

    // загружаем товары один раз при открытии страницы
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products ?? []); // если данных нет, ставим пустой массив
            } catch (error) {
                console.error("Failed to load products", error);
            }
        };

        loadProducts();
    }, []);

    // выбираем лучшие товары (useMemo пересчитывает только при изменении products)
    const hits = useMemo(
        () =>
            products
                .filter(p => p.rating >= 4.5)       // только с рейтингом 4.5 и выше
                .sort((a, b) => b.rating - a.rating) // сначала самые высокие
                .slice(0, 6),                        // берём первые 6
        [products]
    );

    // если хитов нет (грузятся или их просто нет), ничего не показываем
    if (hits.length === 0) return null;

    return (
        <section className="hit-pr">
            {/* слайдер: сам листает слайды каждые 5 секунд */}
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }} // точки внизу, на них можно нажимать
                loop={hits.length > 2}           // зацикливаем, если слайдов больше двух
                autoplay={{
                    delay: 5000,                  // пауза между слайдами (мс)
                    pauseOnMouseEnter: true,      // при наведении мыши листание стоит
                    disableOnInteraction: false,  // после клика автолистание не отключается
                }}
                spaceBetween={20} // расстояние между слайдами
            >
                {/* по одному слайду на каждый товар */}
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