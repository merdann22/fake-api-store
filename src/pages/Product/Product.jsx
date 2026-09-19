import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProduct} from "../../services/api";

export default function Product () {

    const {id} = useParams();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const loadProduct = async () => {
            const data = await getProduct(id);
            setProduct([data]);
        };
        loadProduct();
    },[id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    console.log(product, id);

    return (
        <div className="info-product">
            {product.map((product) => (
                <div key={product.id} className="info-product__container">
                    <div>
                        <h1>
                            {product.title}
                        </h1>
                        <p>
                            {product.description}
                        </p>
                        <h1>
                            {product.price}
                        </h1>
                        <Link to={`/`}>
                            {product.category}
                        </Link>
                        <h2>{product.rating.count}</h2>
                        <h2>{product.rating.rate}</h2>
                    </div>
                    <div>
                        <img src={product.image} alt=""/>
                    </div>
                </div>
                ))}
        </div>
    )
}