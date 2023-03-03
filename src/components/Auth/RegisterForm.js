import './Register.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';
import { registerUser } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
const RegisterForm = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [error, setError] = useState({
        role: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isValid, setIsValid] = useState({
        role: false,
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = await registerUser(userName, email, password);
        console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const checkUserName = (user) => {
        let errorUserName;
        if (/^[A-Za-z][A-Za-z0-9_]{5,14}$/.test(user)) {
            errorUserName = ''
        } else {
            errorUserName = ` 
            The number of characters must be between 6 and 15.
            Username should only contain alphanumeric characters and/or underscores (_).
            The first character of the string should be alphabetic.
            `;
        }
        setIsValid({
            ...isValid,
            userName: errorUserName.length !== 0 ? true : false
        })
        return errorUserName;
    }
    const checkRole = (role) => {

        setIsValid({
            ...isValid,
            role: role === '1' || role === '2' ? false : true
        })

    }


    const firstRender = useRef(false);

    useEffect(() => {
        if (firstRender.current === true) {

            setError({
                ...error,
                userName: checkUserName(userName)

            });
        }
        return () => {
            console.log('gg');
            firstRender.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    useEffect(() => {
        if (firstRender.current === true) {
            setError({
                ...error,
                role: checkRole(role)

            });
        }
        return () => {
            firstRender.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);



    return (
        <Form>

            <Form.Select
                className="mb-3 "
                isInvalid={isValid.role}
                value={role}
                onChange={e => setRole(e.target.value)}
            >
                <option> Choice role</option>
                <option value="1">User</option>
                <option value="2">Admin</option>
            </Form.Select>
            <div className='form-group'>

                <input type={'text'}
                    className="form-control"
                    value={userName}
                    placeholder='Username'
                    onChange={(e) => setUserName(e.target.value)}

                />
                {isValid.userName ?
                    <div className='error'>
                        <pre>{error.userName}</pre>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className='form-group'>

                <input type={'email'}
                    className="form-control"
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='form-group pass-group'>

                <input
                    type={isShowPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isShowPassword ?
                    <span className='icons-eye' onClick={() => setIsShowPassword(!isShowPassword)}>
                        <AiOutlineEye />
                    </span>
                    :
                    <span className='icons-eye' onClick={() => setIsShowPassword(!isShowPassword)}>
                        <AiOutlineEyeInvisible />
                    </span>
                }
            </div>
            <div>
                <button
                    className='btn-submit'
                    onClick={(e) => handleRegister(e)}
                > Sign up
                </button>
            </div>
        </Form>
    )
}

export default RegisterForm;