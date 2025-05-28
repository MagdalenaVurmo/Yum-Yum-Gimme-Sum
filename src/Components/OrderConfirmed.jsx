import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import styles from "../styles/OrderConfirmed.module.scss";



function OrderConfirmed() {
const navigate = useNavigate(); 
const location = useLocation(); 
const dispatch = useDispatch();

const TheOrder = location.state?.orderNumber;
const ETA = location.state?.ETA;
const [timeLeft, setTimeLeft] = useState(0); // Time left for the order to be ready


useEffect(() => { 
    if (ETA) {
        const interval = setInterval(() => {
            const now = new Date();
            const TimeEta = new Date(ETA);
            const Difference = Math.max(0, Math.round((TimeEta - now)/60000)); // Calculate the difference in seconds

            setTimeLeft(Difference); // Update the time left state
            
            if (Difference <= 0) clearInterval(interval); // Clear the interval when the time is up
            }, 1000); // Update every second

            return () => clearInterval(interval); // Cleanup the interval on component
        }
        }, [ETA]);

        const NewOrder = () => {
            dispatch(clearCart()); // Clear the cart in the Redux store
            navigate("/"); // Navigate to the home page
        };

        return (
            <div className={styles.orderConfirmed}>
                <img src="img/box.png" alt="Cart" className={styles.boxIcon} />
                <h2 className={styles.HeaderConfirm}>DINA WONTONS TILLAGAS!</h2>

                {timeLeft !== 0 ? (
                    <p className={styles.ETA}>Leveransen kommer om {timeLeft} MIN</p>
                    ) : (
                        <p>Leveranstid ej tillgänglig</p>
                    )}
                <p className={styles.TheOrder}> #{TheOrder}</p>

                <button className={styles.NewOrderButton} onClick={NewOrder}>
                   Gör En Ny Beställning
                </button>
            </div>
    );
}



export default OrderConfirmed;