import "./HitProducts.scss";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getProducts} from "../../../services/api";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HitProducts () {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts('products');
            setProducts(data);
        };
        loadProducts();
    }, []);

    const hits = products
        .filter(product =>
            product.rating.rate >=4.5)
        .sort((a, b) => b.rating.rate-a.rating.rate);

    console.log(hits, 'Hits');
    console.log(products);

    return (
        <section className="hit-products">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{clickable: true}}
                loop
                autoplay={{
                    delay: 8000,
                }}
                spaceBetween={20}
                sliderPerView={4}
            >
                {hits.map((product,index) => (
                    <SwiperSlide className="slide" key={product.id}>
                        <div className="hit-products__container">
                            <div className="products_title">
                                <h1>
                                    Hit products #{index+1}
                                </h1>
                                <h2>
                                    Rating - {product.rating.rate}
                                </h2>
                                <button id={product.id}>
                                    <Link to={`/product/${product.id}`}>
                                        Open product
                                    </Link>
                                </button>
                            </div>
                            <img src={product.image} alt=""/>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}