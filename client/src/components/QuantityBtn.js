import { useCart } from '../contexts';

export function QuantityBtn({productInfo}) {
    const {cartItems, setCartItems} = useCart();

    // check if the cart has the product associated with this button
    // findIndex() return -1 if the product is not in the cart or the corresponding index otherwise
    let productIdxInCart = cartItems.findIndex((item) => item.id === productInfo.id);

    const handleAdd = () => {
        setCartItems(cartItems => {
            const newCartItems = [...cartItems];
            if (productIdxInCart === -1) {
                newCartItems.push({
                    ...productInfo,
                    quantity: 1
                });
            }
            else {
                newCartItems[productIdxInCart] = { ...cartItems[productIdxInCart], quantity: cartItems[productIdxInCart].quantity + 1 };
            }
            return newCartItems;
        });
    }

    const handleSubtract = () => {
        setCartItems(cartItems => {
            const newCartItems = [...cartItems];
            if (cartItems[productIdxInCart].quantity === 1) {
                newCartItems.splice(productIdxInCart, 1);
            }
            else {
                newCartItems[productIdxInCart] = { ...cartItems[productIdxInCart], quantity: cartItems[productIdxInCart].quantity - 1 };
            }
            return newCartItems;
        });
    }

    return (
        <div className="addToCart">
        {
            productIdxInCart === -1 ?
            <span className="addToCartBtn" onClick={handleAdd}>Add to shopping cart</span> :
            <div>
                <span className="subtractBtn" onClick={handleAdd}>+</span>
                {cartItems[productIdxInCart].quantity}
                <span className="addBtn" onClick={handleSubtract}>-</span>
            </div>
        }
        </div>
    )
}
