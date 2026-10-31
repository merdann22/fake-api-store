// Categories.jsx — список категорий с иконками, каждая ведёт на свою страницу

import "./Categories.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../../services/api";

// Иконки из react-icons. Префикс = набор: Fa — Font Awesome, Md — Material,
// Gi — Game Icons, Bs — Bootstrap
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

// slug категории из API → её иконка
const CATEGORY_ICONS = {
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

export default function Categories() {
    const [categories, setCategories] = useState([]);

    // Загружаем категории один раз при монтировании
    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data ?? []))
            .catch((error) => console.error("Failed to load categories", error));
    }, []);

    return (
        <section className="category-wrapper">
            <h1>Категории</h1>

            <div className="category-wrapper__categories">
                {categories.map((item) => {
                    // Иконка по slug; если её нет в словаре — запасная.
                    // Имя с большой буквы, чтобы React воспринял её как компонент
                    const Icon = CATEGORY_ICONS[item.slug] ?? MdCategory;

                    return (
                        <Link
                            key={item.slug}
                            to={`/category/${item.slug}`}
                            className="category-wrapper__btn"
                        >
                            <Icon className="category-wrapper__icon" />
                            <p>{item.name}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}