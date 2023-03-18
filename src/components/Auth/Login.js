import { useState } from 'react';
import '../Auth/Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import Language from '../Header/Language';
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [isLoading, setIsLoading] = useState(false);
    const isLoading = useSelector(state => state.user?.process?.isLoading);
    //console.log(isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        postLogin(email, password, dispatch, navigate);
    }

    const handleKeyDown = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <div className="login-container">
            <div className='header' >
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/register') }}>Sign up</button>
                <Language />
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
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                <span className='forgot-password'>Forgot your password?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {isLoading === true && <FaSpinner className='loaderIcon' />}
                        <span>Login</span> </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>

        </div>
    )
}

export default Login;