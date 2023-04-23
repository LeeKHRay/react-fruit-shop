import { Link, Outlet } from 'react-router-dom';
import { Logout } from '../components';
import { useAuth } from '../contexts';

export function PageLayout() {
    const { user, isGettingUser } = useAuth();

    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                {
                    !isGettingUser && (
                        <>
                            {!user && <Link to="/login">Login</Link>}
                            {!user && <Link to="/signup">Signup</Link>}
                            {user && <Link to="/checkout">Shopping Cart</Link>}
                            {user && <Logout />}
                        </>
                    )
                }
            </nav>
            <Outlet /> {/* render child route's element */}
        </>
    )
}

