import "./PopularProducts.scss";
import {useEffect, useState} from "react";
import {getProducts} from "../../../../services/api";
import ProductCard from "../../../../components/ProductCard/ProductCard";

export default function PopularProducts () {

    const [products, setProducts] = useState([]);

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
    })

    return (
        <section className="popular-pr">
            <h1>Популярные товары</h1>
            <div className="popular-pr__container">
                {products?.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ))}
            </div>
        </section>
    )
}