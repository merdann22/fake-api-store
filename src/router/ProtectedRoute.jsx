// router/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    // isLoggedIn уже есть в твоём AuthContext
    const { isLoggedIn } = useAuth();
    // Outlet выводит вложенный маршрут (Cart или Profile), если вход выполнен
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}