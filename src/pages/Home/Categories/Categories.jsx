import "./Categories.scss";
import {useEffect, useState} from "react";
import {getCategories} from "../../../services/api";
import {Link} from "react-router-dom";


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
            <div className="categoryCard"><Link to={'/products/category'}>All products</Link></div>
            {category.map((product) => (
                <div className="categoryCard" key={product.id}>
                    <Link to={`/products/category/${category}`}>{product}</Link>
                </div>
            ))}
        </section>
    )
}