import { useState } from 'react';
import '../Auth/Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';

import { useDispatch } from 'react-redux';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        postLogin(email, password, dispatch, navigate);
    }
    return (
        <div className="login-container">
            <div className='header' >
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/register') }}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                TypeForm
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who’s this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={'email'}
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <span className='forgot-password'>Forgot your password?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                    > Login</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>

        </div>
    )
}

export default Login;