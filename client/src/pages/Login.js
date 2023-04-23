import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Title } from '../components';
import { useAuth } from '../contexts';
import { request, setToken, setAuthHeader, unsetAuthHeader, getUser } from '../util.js';

export function Login() {
    const [userInfo, setUserInfo] = useState({username: "", password: ""});
    const { user, setUser } = useAuth();

    const handleChange = ({target})=> {
        setUserInfo({
            ...userInfo,
            [target.name]: target.value 
        });
    }

    const handleClick = (e) => {
        const {username, password} = userInfo;
        if (username.length === 0) {
            alert('Please enter username');
        }
        else if (password.length === 0) {
            alert('Please enter password');
        }
        else {
            request.post('/login', userInfo)
            .then(res => {
                setAuthHeader(res.data.token);
                setToken(res.data.token);
                
                getUser()
                .then(res => {
                    if (res.data.auth) {
                        setUser({username: res.data.username});
                    }
                    else {
                        setToken(null);
                        unsetAuthHeader();
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setToken(null);
                    unsetAuthHeader();
                });
            })
            .catch(e => {
                console.log(e);
                if (e.response.data.error) {
                    alert(e.response.data.error.msg);
                }
            });
        }
    }

    return (
        user ? <Navigate to="/" replace={true} /> : // redirect user after logging in
        
        <>
            <Title title="Login" />

            <form className="form">
                <div>
                    <label htmlFor ="username"><strong>Username: </strong></label><br />
                    <input type="text" id="username" name="username" value={userInfo.username} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor ="password"><strong>Password: </strong></label><br />
                    <input type="password" id="password" name="password"  value={userInfo.password} onChange={handleChange} />
                </div>

                <button type="button" className="formBtn" onClick={handleClick}>Login</button>
            </form>
        </>
    )
}
