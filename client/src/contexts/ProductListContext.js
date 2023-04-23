import { useState, useMemo, createContext, useContext } from "react";

const ProductListContext = createContext();

export function ProductListProvider({ children }) {
    const [productList, setProductList] = useState([]);
    
    const contextValue = useMemo(() => ({ 
        productList, setProductList
    }), [productList]);

    return (
        <ProductListContext.Provider value={contextValue}>
            {children}
        </ProductListContext.Provider>
    )
}

export function useProductList() {
    return useContext(ProductListContext);
}
