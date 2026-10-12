import "./Categories.scss";
import {useEffect, useState} from "react";
import {getCategories} from "../../../../services/api";

// Иконки из библиотеки react-icons.
// Буквы в пути показывают набор: fa = Font Awesome, md = Material, gi = Game Icons, bs = Bootstrap
import {
    FaLaptop, FaMotorcycle, FaCar, FaTabletAlt, FaMobileAlt,
    FaHeadphones, FaShoppingBasket, FaHome, FaSpa,
} from "react-icons/fa";
import {
    MdChair, MdKitchen, MdWatch, MdFace, MdSportsBasketball, MdCategory,
} from "react-icons/md";
import {
    GiPerfumeBottle, GiShirt, GiTShirt, GiConverseShoe, GiSunglasses,
    GiHandBag, GiDress, GiDiamondRing, GiHighHeel,
} from "react-icons/gi";
import { BsWatch } from "react-icons/bs";
import {Link} from "react-router-dom";

// Словарь: ключ это slug категории из API, значение это иконка для неё
const categoryIcons = {
    "beauty": FaSpa,
    "fragrances": GiPerfumeBottle,
    "furniture": MdChair,
    "groceries": FaShoppingBasket,
    "home-decoration": FaHome,
    "kitchen-accessories": MdKitchen,
    "laptops": FaLaptop,
    "mens-shirts": GiShirt,
    "mens-shoes": GiConverseShoe,
    "mens-watches": MdWatch,
    "mobile-accessories": FaHeadphones,
    "motorcycle": FaMotorcycle,
    "skin-care": MdFace,
    "smartphones": FaMobileAlt,
    "sports-accessories": MdSportsBasketball,
    "sunglasses": GiSunglasses,
    "tablets": FaTabletAlt,
    "tops": GiTShirt,
    "vehicle": FaCar,
    "womens-bags": GiHandBag,
    "womens-dresses": GiDress,
    "womens-jewellery": GiDiamondRing,
    "womens-shoes": GiHighHeel,
    "womens-watches": BsWatch,
};

export default function Categories () {

    // Здесь хранится список категорий. Сначала он пустой, потом заполняется данными с сервера
    const [category, setCategory] = useState([]);

    // Этот код выполняется один раз, когда компонент появился на странице
    useEffect(() => {
        const loadCategories = async () => {
            // Запрашиваем категории из API
            const data = await getCategories('/categories/');
            // Сохраняем их в состояние, после этого компонент перерисуется
            setCategory(data);
        }
        loadCategories();

    }, []) // пустой массив [] означает "запустить только один раз"

    return (
        <section className="category-wrapper">
            <h1>Категории</h1>
            <div className="category-wrapper__categories">
                {/* Для каждой категории создаём ссылку-кнопку */}
                {category.map((item) => {
                    // Берём иконку по slug. Если для него иконки нет, ставим запасную MdCategory.
                    // Имя пишем с большой буквы, иначе React не поймёт, что это компонент
                    const Icon = categoryIcons[item.slug] || MdCategory;
                    return (
                        <Link
                            key={item.slug} // key нужен React, чтобы различать элементы списка
                            to={`/category/${item.slug}`} // ссылка на страницу категории
                            className="category-wrapper__btn"
                        >
                            <Icon className="category-wrapper__icon" />
                            <p>{item.name}</p>
                        </Link>
                    );
                })}
            </div>

        </section>
    )
}