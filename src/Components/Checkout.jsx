import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";
import { clearCart } from "../store/cartSlice";



function Checkout() {
    const dispatch = useDispatch(); // Get the dispatch function from useDispatch
    const navigate = useNavigate(); // Get the navigate function from useNavigate
    const cartItems = useSelector((state) => state.cart.items); // Get the cart items from the Redux store 
    const tenantId = "bqtg";
    const ApiKey = "yum-BAPUdN5hTPLuK3iN";

    const ThePrice = cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0

    );
    const handleCheckout = async () => {
        
        if(cartItems.length === 0) {
            alert("Din varukorg är tom! Lägg till varor i varukorgen innan du går till kassan.");
            return;
        }
        
        const DataOrder = {
            items: cartItems.map(item => item.id),
        };

    

    try {
            const response = await createOrder(tenantId, DataOrder, ApiKey );
            
            if (response && response.orders){
                console.log("Beställning lagd, tömmer varukorg...");
                dispatch(clearCart()); // Clear the cart in the Redux store
                console.log("Varukorg tömd.");
                navigate("/order-confirmed", { state: { ETA: response.orders.ETA, TheOrder: response.orders.id } }); // Navigate to the order confirmation page
            } else {
                console.error("API-svar är ogiltigt:", response.error);
                alert("Något gick fel med din beställning: " + (response.error || "Kontakta supporten för hjälp."));
            }
        } catch (error) {
            console.error("Fel vid beställning:", error);
            alert("Något gick fel med din beställning. Var snäll och kontakta supporten för hjälp.");
        }
    }

            return (
                <div>
                    <h2>Din Varukorg</h2>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                {item.name} - {item.price} SEK
                                </li>
                                ))}     
                        </ul>
                            <h3>Total: {ThePrice} SEK</h3>
                            <button onClick={handleCheckout}>Lägg till Beställning</button>
                 </div>
            );  
        
};



export default Checkout;