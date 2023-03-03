import './Register.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaLock, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
const SignupForm = () => {

    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
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
            <Form.Group className="mb-3" controlId="formUserName">

                <InputGroup className="mb-3" hasValidation>
                    <InputGroup.Text id="basic-addon1"><FaUser /></InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        type='text'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        isInvalid={isValid.userName}
                    // value
                    />
                    <Form.Control.Feedback type="invalid">
                        <pre>{error.userName}</pre>
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><MdEmail /></InputGroup.Text>
                    <Form.Control
                        placeholder="Your email"
                        type='email'
                    // value
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassWord">

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FaLock /></InputGroup.Text>
                    <Form.Control
                        placeholder="Password"
                        type='password'
                    // value
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassWord">

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FaKey /></InputGroup.Text>
                    <Form.Control
                        placeholder="Repeat your password"
                        type='password'
                    // value
                    />
                </InputGroup>
            </Form.Group>
            <div className='d-flex justify-content-center'>
                <Button variant="primary" type="submit" className="px-5" >
                    Submit
                </Button>
            </div>

        </Form>
    );
}

export default SignupForm;