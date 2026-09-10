import "./HitProducts.scss";
import {useEffect, useState} from "react";
import {getProductsByCategory} from "../../../services/api";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HitProducts  ()  {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProductsByCategory('electronics');
            setProducts(data.slice(0,5));
        };
        loadProducts();
    }, []);

    console.log(products);

    return (
        <section className="HitProducts">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{clickable: true}}
                loop
                autoplay={{
                    delay: 5000,
                }}
                spaceBetween={20}
                sliderPerView={4}
            >
                {products.map((product) => (
                    <SwiperSlide className="slide" key={product.id}>
                            <img src={product.image} alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}