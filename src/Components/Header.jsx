import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/Header.module.scss';

function Header() {
const CartStuff = useSelector((state) => state.cart.items);
const stuffTotal = CartStuff.reduce((total, item) => total + item.quantity, 0); // Counts all items in the cart


return (
    <header className={styles.header}>
      <img src="/img/logo.png" alt="Yum Yum Gimme Sum" className={styles.headerIcon} />
        <Link to="/cart" className={styles.Linkcart}>
            <img src="/img/cart.svg" alt="Cart" className={styles.cartIcon} />
            {stuffTotal > 0 && (
            <span className={styles.cartCount}>{stuffTotal}</span>
        )}
        </Link>
    </header>
  );
}

export default Header;