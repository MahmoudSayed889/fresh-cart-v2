import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer';
import CartContextProvider from '../../features/cart/context/CartContextProvider';

export default function Layout(testall) {

  return <>
    <CartContextProvider>
      <Header />

      <div style={{ minHeight: "75vh" }}>
        <Outlet />
      </div>

      <Footer />
    </CartContextProvider>
  </>
}
