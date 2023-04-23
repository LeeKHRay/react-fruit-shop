import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components';
import { request } from '../util.js';

export function Signup() {
    const [userInfo, setUserInfo] = useState({username: "", password: "", rePassword: ""});
    const navigate = useNavigate();

    const handleChange = ({target})=> {
        setUserInfo({
            ...userInfo,
            [target.name]: target.value 
        });
    }

    const handleClick = (e) => {
        const {username, password, rePassword} = userInfo;
        if (username.length === 0) {
            alert('Please enter username');
        }
        else if (password.length === 0) {
            alert('Please enter password');
        }
        else if (password !== rePassword) {
            alert('Two passwords do not match');
        }
        else {
            request.post('/signup', userInfo)
            .then(res => {
                alert(res.data.msg);
                navigate('/login');
            })
            .catch(e => {
                if (e.response.data.error) {
                    alert(e.response.data.error.msg);
                }
            });
        }
    }

    return (
        <>
            <Title title="Signup" />

            <form className="form">
                <div>
                    <label htmlFor="username"><strong>Username (at least 6 characters): </strong></label><br />
                    <input type="text" id="username" name="username" value={userInfo.username} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor ="password"><strong>Password (at least 8 characters, contains at least 1 lowercase and 1 uppercase letter, and 1 number): </strong></label><br />
                    <input type="password" id="password" name="password" value={userInfo.password} onChange={handleChange} />
                </div>
                
                <div>
                    <label htmlFor ="password"><strong>Confirm Password: </strong></label><br />
                    <input type="password" id="rePassword" name="rePassword"  value={userInfo.rePassword} onChange={handleChange} />
                </div>

                <button type="button" className="formBtn" onClick={handleClick}>Signup</button>
            </form>
        </>
    )
}
