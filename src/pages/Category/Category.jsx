import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory} from "../../services/api";

export default function Category () {

    const { name } = useParams();

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const loadProductsByCategory = async () => {
            const data = await getProductsByCategory();
            setCategory(data.products);
        };
        loadProductsByCategory();
    },[name])

    console.log(name);

    return (
        <div>
            {category.map((product) => (
                    <div className="categoryCard" key={product.id}>
                        <h1>{product.title}</h1>
                        <p>{product.price}$</p>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />
                    </div>
            ))}

        </div>
    )
}