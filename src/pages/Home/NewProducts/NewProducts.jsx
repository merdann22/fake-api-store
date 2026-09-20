import "./NewProducts.scss";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getProducts} from "../../../services/api";
import {SwiperSlide, Swiper} from 'swiper/react';
import {Autoplay, Pagination} from "swiper/modules";
import 'swiper/css/pagination';
import 'swiper/css';

export default function NewProducts () {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const loadProducts = async () => {
            const data = await getProducts(`/products/`);
            setProducts(data);
        }
        loadProducts();
    }, [])

    const news = products.sort((a, b) => a.id - b.id).slice(0, 6);

    return (
        <section className="news-products">
            <Swiper modules={[Autoplay, Pagination]}
                    pagination={{clickable: true}}
                    loop
                    autoplay={{
                        delay: 5000,
                    }}
                    spaceBetween={20}
                    sliderPerView={4}
            >
                {news.map((product,index) => (
                    <SwiperSlide key={product.id} className="slide" >
                        <div className="news-products__container">
                            <div className="products_title">
                                <h1>New products #{index+1}</h1>
                                <h2>Rating - {product.rating.rate}</h2>
                                <button>
                                    <Link to={`/product/${product.id}`}> Open product</Link>
                                </button>
                            </div>
                            <img src={product.image} alt=""/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


        </section>
    )
};