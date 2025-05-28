import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice';
import styles from '../styles/Menu.module.scss';
import { setMenu } from '../store/menuSlice';
import { fetchApiKey, fetchMenu } from '../services/api';
import { Link } from 'react-router-dom';


function Menu() {
    const dispatch = useDispatch();
    const ItemsMenu = useSelector(state => state.menu.items);

    useEffect(() => {
        const GETmenu = async () => {
        console.log("🚀 Hämtar menydata...");

            try {
        // Fetch API key and menu data
        const ApiKey = await fetchApiKey();
        console.log("🔑 API-nyckel hämtad:", ApiKey);
        
        const menuDATA = await fetchMenu(ApiKey);
        console.log("📜 Menydata hämtad:", menuDATA);

            if (menuDATA) {
            dispatch(setMenu(menuDATA.items)); 
            console.log("🍽️ Menynsdata har hämtats:", menuDATA.items);
            } else {
            console.error("🚫 Det gick inte att hämta menydata");
            }     

             } catch (error) {
            console.error("❌ Fel vid hämtning av menydata:", error);
        }
        };
        
        GETmenu();
    }, [dispatch]);

    const handleAddItem = (item) => {
        console.log("Lägger till objekt i varukorgen:", item);
        dispatch(addItem(item));
    }; 

    const dips = ItemsMenu.filter(item => item.type?.toLowerCase() === 'dips');
    const nonDips = ItemsMenu.filter(item => item.type?.toLowerCase() !== 'dips');

    return (
       <div className={styles.ContainerMenu}>
        {ItemsMenu.length === 0 ? (
            <p> Inga varor är tillgängliga. </p>
    ) : (
        <div>
            <div className={styles.TitleMenu}>
                <h2 className={styles.MenyTitle}>Meny</h2>
            </div>

            {nonDips.map(item => ( 
                <div className={styles.MenuStuff} key={item.id} onClick={() => handleAddItem(item)}>
                    <div className={styles.TopRow}>
                        <div className={styles.NameItem}>{item.name}</div>
                        <div className={styles.PriceItem}>{item.price} SEK</div>

                    </div>
                    <div className={styles.DescriptionITEM}>
                        {Array.isArray(item.ingredients) ? item.ingredients.join(', ') : 'Inga ingredienser tillgängliga'}
                    </div>
                </div>
            ))}

            {dips.length > 0 && (
                <div className={styles.DipsContainer}>
                    <div className={styles.TopRow}>
                        <div className={styles.NameItem}>Dipsås</div>
                        </div> 
                        <div className={styles.DescriptionITEM}>
                            {dips.map(dip => (
                                <div
                                key={dip.id}
                                className={styles.DipStuff}
                                onClick={() => handleAddItem(dip)}
                                >
                                        {dip.name}
                                    </div>
                            ))}
                            </div>
                            </div>
                            )}
                        </div>  

                    )}
            </div>
            
        );
            
 }

export default Menu;