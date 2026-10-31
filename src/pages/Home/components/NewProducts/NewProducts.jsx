// NewProducts.jsx — слайдер с самыми новыми товарами

import "./NewProducts.scss";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getProducts } from "../../../../services/api";

import "swiper/css";
import "swiper/css/pagination";

// Сколько новинок показывать в слайдере
const NEWS_COUNT = 6;

export default function NewProducts() {
    const [products, setProducts] = useState([]);

    // Загружаем товары один раз при монтировании
    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data.products ?? []))
            .catch((error) => console.error("Failed to load products", error));
    }, []);

    // Новинки = товары с самым большим id (добавлены последними).
    // [...products] — копия массива, чтобы sort не менял state напрямую
    const news = useMemo(
        () =>
            [...products]
                .sort((a, b) => b.id - a.id)
                .slice(0, NEWS_COUNT),
        [products]
    );

    // Пока нечего показывать — не рендерим секцию
    if (news.length === 0) return null;

    return (
        <section className="news-pr">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                loop={news.length > 2}
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
                spaceBetween={20}
            >
                {news.map((product, index) => (
                    <SwiperSlide className="news-pr__slide" key={product.id}>
                        <div className="news-pr__container">
                            <div className="news-pr__title">
                                {/* h2 вместо h1 — главный заголовок на странице должен быть один */}
                                <h2>New products #{index + 1}</h2>
                                <p>Rating - {product.rating}</p>
                                <Link to={`/product/${product.id}`} className="news-pr__btn">
                                    Open product
                                </Link>
                            </div>

                            <img src={product.thumbnail} alt={product.title} loading="lazy" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}