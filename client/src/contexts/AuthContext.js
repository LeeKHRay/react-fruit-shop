import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { getToken, setToken, setAuthHeader, unsetAuthHeader, getUser } from '../util';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // not sure if user is logged in, need to check in useEffect()
    const [isGettingUser, setIsGettingUser] = useState(true);

    useEffect(() => {
        let token = getToken();
        if (token) {
            setAuthHeader(token);

            getUser()
            .then(res => {
                if (res.data.auth) {
                    setUser({username: res.data.username});
                }
                else {
                    setToken(null);
                    unsetAuthHeader();
                }
                setIsGettingUser(false);
            })
            .catch((e) => {
                console.log(e);
                setToken(null);
                unsetAuthHeader();
                setIsGettingUser(false);
            });
        }
        else {
            setIsGettingUser(false);
        }
    }, []);

    const contextValue = useMemo(() => ({ 
        user, setUser, isGettingUser, setIsGettingUser
    }), [user, isGettingUser]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
