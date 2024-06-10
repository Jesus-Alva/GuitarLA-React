import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import {db} from "./data/db";

export default function App() {
    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item){

        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if(itemExist >= 0){
            if(cart[itemExist].quantity >= MAX_ITEMS) return
            const updateCart = [...cart];
            updateCart[itemExist].quantity++;
            setCart(updateCart);
        }else{
            item.quantity = 1
            setCart([...cart, item]);
        }
        
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id){
        const updatedCart = cart.map(items => {
            if(items.id === id && items.quantity < MAX_ITEMS){
                return {
                    ...items,
                    quantity: items.quantity + 1
                }
            }
            return items;
        })
        setCart(updatedCart);
    }
    function decreaseQuantity(id){
        const updatedCart = cart.map(items => {
            if(items.id === id && items.quantity > MIN_ITEMS){
                return {
                    ...items,
                    quantity: items.quantity - 1
                }
            }
            return items;
        })
        setCart(updatedCart);
    }
    function clearCart(){
        setCart([]);
    }

  return (
    <>
    <Header 
        cart={cart}
        removeFromCart={removeFromCart} 
        increaseQuantity={increaseQuantity} 
        decreaseQuantity={decreaseQuantity} 
        clearCart={clearCart}/>
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map(currentGuitar => (
                <Guitar 
                    key={currentGuitar.id} 
                    guitar={currentGuitar} 
                    addToCart={addToCart}
                    />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
      
    </>
  )
}
