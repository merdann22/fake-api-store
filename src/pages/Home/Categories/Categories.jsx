import "./Categories.scss";
import {useEffect, useState} from "react";
import {getCategories} from "../../../services/api";


export default function Categories () {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getCategories('/categories/');
            setCategory(data);
        }
        loadCategories();
    }, [])

    console.log(category)

    return (
        <section className="NewProducts">
            {category.map((product) => (
                <div className="categoryCard" key={product.id}>
                    {product}
                </div>
            ))}
        </section>
    )
}