import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts';

export function PrivateRoute() {
    const { user, isGettingUser } = useAuth();

    return (
        isGettingUser ? null : (user ? <Outlet /> : <Navigate to="/" replace={true} />)
    )
}
