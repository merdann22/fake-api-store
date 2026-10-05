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
        <section className="categoriesSection">
            <h1>Категории</h1>
            <div className="categories">
                {category.map((category) => (
                    <Link to={`/category/${category.slug}`}>
                        <button className="categoryCard" key={category.slug}>

                            {category.name}

                        </button>
                    </Link>
                ))}
            </div>

        </section>
    )
}