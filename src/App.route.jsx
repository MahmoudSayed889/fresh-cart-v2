import { createBrowserRouter, useNavigate } from "react-router-dom";
import Layout from "./shared/layout/Layout";
import Home from "./features/home/Home";
import ProductDetails from "./features/productDetails/ProductDetails";
import Products from "./features/products/Products";
import Brands from "./features/brands/Brands";
import Cart from "./features/cart/Cart";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import Notfound from "./features/notfound/Notfound";
import { AuthContext } from "./App";
import { useContext } from "react";
// import CartContextProvider from "./features/cart/context/CartContextProvider";

const ProtectedRoute = ({ children }) => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    if (currentUser == null) {
        navigate('/login')
    } else {
        return <>
            {children}
        </>
    }
}

export const router = createBrowserRouter([
    {
        path: '', element: <Layout />, children: [
            {
                path: '', element: <Home />
            },
            {
                path: 'home', element: <Home />
            },
            {
                path: 'product/:id', element: <ProductDetails />
            },
            {
                path: 'products', element: <Products />
            },
            {
                path: 'products/:brandiId', element: <Products />
            },
            {
                path: 'brands', element: <Brands />
            },
            {
                path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute>
            },

            // auth
            {
                path: 'login', element: <Login />
            },
            {
                path: 'register', element: <Register />
            },

            // 404 page
            {
                path: '*', element: <Notfound />
            },
        ]
    }
])