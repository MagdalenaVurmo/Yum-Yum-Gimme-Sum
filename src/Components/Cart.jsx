import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Cart.module.scss';
import { createOrder } from '../services/api';

// This component is used to display each item in the cart. It shows the name, price, and quantity of the item, and allows the user 
// to increase or decrease the quantity or remove the item from the cart. 
// The component uses Redux actions to handle these operations.

function Cart() {
    const navigate = useNavigate();
    const tenantId = "bqtg";
    const ApiKey = "yum-BAPUdN5hTPLuK3iN";
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const RemoveThisItem = (itemId) => {
        dispatch(removeItem({ id: itemId }));
    };

    const handleThisOrder = async () => {
        
        if(cartItems.length === 0) {
            alert("Din varukorg är tom! Lägg till varor i varukorgen innan du går till kassan.");
            return;
        };
        
        const DataOrder = {
            items: cartItems.map(item => item.id),
        };

         try {
                    const response = await createOrder(tenantId, DataOrder, ApiKey );
                    console.log("📦 Svar från createOrder:", response);
                    
                    if (response && response.order){ 
                        navigate("/order-confirmed", { state: { ETA: response.order.eta, orderNumber: response.order.id } }); // Navigate to the order confirmation page
                        console.log("Beställning skapad:", response.order);
                        
                    } else {
                        console.error("API-svar är ogiltigt:", response.error);
                        alert("Något gick fel med din beställning: " + (response.error || "Kontakta supporten för hjälp."));
                    }
                } catch (error) {
                    console.error("Fel vid beställning:", error);
                    alert("Något gick fel med din beställning. Var snäll och kontakta supporten för hjälp.");
                }
            }

            const Amount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    
            return (
                <div className={styles.cartContainer}>
                <h2 className={styles.cartHeader}>Din Varukorg</h2>
                {cartItems.length === 0 ? (
                  <p>Du har inga varor i din varukorg.</p>
                ) : (
                  <ul className={styles.cartItem}>
                    {cartItems.map(item => (
                      <li key={item.id} className={styles.cartListItem}>
                        <div className={styles.itemDetails}>
                          <span className={styles.itemName}>
                            {item.name}
                            {item.quantity > 1 && <span className={styles.itemQuantity}> x{item.quantity}</span>}
                          </span>
                          <span className={styles.itemPrice}>{item.price} SEK</span>
                        </div>
                        <button className={styles.removeItem} onClick={() => RemoveThisItem(item.id)}>Ta bort</button>
                      </li>
                    ))}
                  </ul>
                )}
                <h3 className={styles.total}>Totalt: {Amount.toFixed(2)} SEK</h3>
                {cartItems.length > 0 && (
                  <button onClick={handleThisOrder} className={styles.moneyButton}>Take My Money!</button>
                )}
          
                <Link to="/">
                  <button className={styles.newOrderButton}>Tillbaka till Menyn</button>
                </Link>
              </div>
            )
};

export default Cart;
