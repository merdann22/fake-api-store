import Layout from "../layout/Layout";
import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import Cart from "../pages/Cart/Cart";
import Catalog from "../pages/Catalog/Catalog";
import About from "../pages/About/About";
import Profile from "../pages/Profile/Profile";



const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>} >
                <Route index element={<Home />} />
                <Route path="catolog" element={<Catalog/>} />
                <Route path="product/:id" element={<Product/>}/>
                <Route path="about" element={<About/>} />
                <Route path="cart" element={<Cart/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
        </Routes>
    );
};

export default Router;