import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogOut } from '../../redux/slice/userSlice';
import Language from './Language';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }

    const user = useSelector((state) => state.user?.account);
    const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
    //console.log(user, "|||", isAuthenticated);
    const handleLogOut = async () => {
        let res = await logout(user.email, user.refresh_token);
        if (res && +res.EC === 0) {
            dispatch(doLogOut());
            navigate('/login')
        } else {
            toast.error(res.EM);
        }
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>

                <NavLink to="/" className='navbar-brand'>MyWeb </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home </NavLink>
                        <NavLink to="/users" className='nav-link'>Users </NavLink>
                        <NavLink to="/admins" className='nav-link'>Admin </NavLink>

                    </Nav>
                    <Nav>
                        {!isAuthenticated ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}> Login </button>
                                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()} >Log out</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;