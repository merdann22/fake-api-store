import {NavLink} from "react-router-dom";
import  "./Header.scss";

export default function Header () {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <NavLink to={"/"}>Главная</NavLink>
                </div>
                <nav className="header__nav">

                    <NavLink to={'/products/category'}>Каталог</NavLink>
                    <NavLink to={"/about"}>О проекте</NavLink>
                </nav>
                <input type="search" placeholder="Поиск товаров..."/>
                <div className="header__actions">
                    <NavLink to={"/"}>Избранное</NavLink>
                    <NavLink to={"/cart"}>Корзина</NavLink>
                    <NavLink to={"/profile"}>Профиль</NavLink>
                </div>
            </div>



        </header>
    )
}