import "./Categories.scss";
import {useEffect, useState} from "react";
import {getCategories} from "../../../../services/api";
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
        <section className="category-wrapper">
            <h1>Категории</h1>
            <div className="category-wrapper__categories">
                {category.map((category) => (
                    <Link to={`/category/${category.slug}`} className="category-wrapper__btn">
                            {category.name}
                    </Link>
                ))}
            </div>

        </section>
    )
}