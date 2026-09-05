import {NavLink} from "react-router-dom";
import  "./Header.scss";

export default function Header () {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    Merdann
                </div>
                <nav className="header__nav">
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/catolog">Каталог</NavLink>
                    <NavLink to="/about">О проекте</NavLink>
                </nav>
                <div className="header__actions">
                    <NavLink to="/cart">Корзина</NavLink>
                    <NavLink to="/profile">Профиль</NavLink>
                </div>
            </div>



        </header>
    )
}