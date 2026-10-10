import "./NewProducts.scss";
import {useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../../services/api";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css";

export default function NewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadNewProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products ?? []);
            } catch (error) {
                console.error("Failed to load products", error);
            }
        };

        loadNewProducts();

    }, []);

    const news = useMemo(
        () =>
            products
                .sort((a, b) => a.id - b.id)
                .slice(0, 6),
    [products]
    );

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
                                <h1>New products #{index + 1}</h1>
                                <h2>Rating - {product.rating}</h2>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="news-pr__btn"
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