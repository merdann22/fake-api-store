import "./HitProducts.scss";
import {useEffect, useState} from "react";
import {getProducts}  from "../../../services/api";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

export default function HitProducts  ()  {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts();
            setProducts(data.slice(0,5));
        };
        loadProducts();
    }, []);

    console.log(products);

    return (
        <div className="HitProducts">
            <Swiper
                spaceBetween={20}
                sliderPerView={4}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                            <img src={product.image} alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}