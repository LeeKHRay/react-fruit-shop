import { useState, useMemo, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const contextValue = useMemo(() => ({ 
        cartItems, setCartItems
    }), [cartItems]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}
