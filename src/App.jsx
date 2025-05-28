import React, { useEffect } from 'react';
import Menu from './Components/Menu';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import OrderConfirmed from './Components/OrderConfirmed';
import './styles/global.scss';


const BodyStyler = () => {
    const location = useLocation();
    useEffect(() => {
        document.body.classList.remove('menu-page', 'cart-page', 'checkout-page', 'order-confirmed-page' );

        if (location.pathname === '/') {
            document.body.classList.add('menu-page');
        } else if (location.pathname === '/cart') {
            document.body.classList.add('cart-page');
        } else if (location.pathname === '/checkout') {
            document.body.classList.add('checkout-page');
        } else if (location.pathname === '/order-confirmed') {
            document.body.classList.add('order-confirmed-page');
        }
    }, [location]);

    return null; 
};

function App() {
    const location = useLocation();

    return (    
        <div>
            {location.pathname === '/' && <Header />}
            <BodyStyler/>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmed" element={<OrderConfirmed />} />
            </Routes>
        </div>

    );
}

export default function RouterWrapper() {
   return (
        <Router>
            <App />
        </Router>
   );
}