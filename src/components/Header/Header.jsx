import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineSearch } from "react-icons/ai";

import  "./Header.scss";

export default function Header () {

    const { isLoggedIn, logout } = useAuth();

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
                    {isLoggedIn ? (
                        <div>
                            <NavLink to={"/cart"}>Корзина</NavLink>
                            <NavLink to={"/profile"}>Профиль</NavLink>
                        </div>
                    ) : (
                        <div>
                            <NavLink to={"/login"}>Логин</NavLink>
                            <NavLink to={"/regist"}>Регистрация</NavLink>
                            <button onClick={logout}>Выйти</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}