import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
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
                <div className="header__actions">
                    <NavLink to={"/search"}>
                        <AiOutlineSearch/>
                    </NavLink>
                    <NavLink to={"/cart"}>Корзина</NavLink>
                    <NavLink to={"/profile"}>Профиль</NavLink>
                </div>
            </div>
        </header>
    )
}