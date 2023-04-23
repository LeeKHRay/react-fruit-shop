import { Link } from 'react-router-dom';
import { Title, QuantityBtn } from '../components';
import { useCart } from '../contexts';

export function Checkout() {
    const FREE_SHIPPING_PRICE = 99;
    
    const { cartItems } = useCart();    
    const grandTotal = cartItems.reduce((total, product) => {
        total += product.price * product.quantity;
        return total;
    }, 0);

    return (
        <>
            <Title title="Your Shopping Cart"/>

            {
                cartItems.length > 0
                ? 
                <div className="container">
                    <div className="cartSection">
                        <table className="checkoutTable">
                            <tbody>
                            {
                                cartItems.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <Link to={'/product/' + product.id}>
                                                <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt={product.name}/>
                                            </Link><br />
                                        </td>
                                        <td>
                                            <p>Name: {product.name}</p>
                                            <p>Price: ${product.price}</p>
                                            <p>Description: {product.description}</p>
                                        </td>
                                        <td width="130">
                                            <QuantityBtn productInfo={product} />
                                        </td>
                                        <td>
                                            <div className="productSubTotal">
                                                ${product.price * product.quantity}
                                            </div>
                                        </td>
                                    </tr>
                                )) 
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="checkoutSection">
                        <div>Total price</div>
                        <div className="grandTotal">${grandTotal}</div>
                        {
                            grandTotal >= FREE_SHIPPING_PRICE ?
                            <div className="freeShipping">✔️Free shipping is avaliable</div> :
                            <div className="noShipping">Free Shipping is available on orders over ${FREE_SHIPPING_PRICE}<br />
                            still need ${FREE_SHIPPING_PRICE - grandTotal}</div>
                        }
                        <button>Pay</button>
                    </div>
                </div> 
                :
                <div>
                    <div className="nothingInCart">Your shopping cart don't have product<br /><br />
                    <Link to="/">Go to see product list</Link></div>
                </div>
            }
        </>
    )
}
