import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts';

export function BeforeLoginRoute() {
    const { user, isGettingUser } = useAuth();

    return (
        isGettingUser ? null : (user ? <Navigate to="/" replace={true} /> : <Outlet />)
    )
}
