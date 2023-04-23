import { useAuth, useCart } from '../contexts';
import { setToken, unsetAuthHeader } from '../util';

export function Logout() {
    const { setUser } = useAuth();
    const { setCartItems } = useCart();

    const handleClick = (e) => {
        e.preventDefault();
        setToken(null);
        unsetAuthHeader();
        setUser(null);
        setCartItems([]);
    }
    
    return (
        <a href="/" onClick={handleClick}>Logout</a>
    )
}
