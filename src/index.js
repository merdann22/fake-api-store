import React from 'react';
import App from './App';
import './styles/global.scss';
import { AuthProvider } from "./context/AuthContext";
import { createRoot } from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
);