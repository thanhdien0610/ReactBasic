import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }

    const user = useSelector((state) => state.user?.account);
    const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
    console.log(user, "|||", isAuthenticated);

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
                            <>
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Log in</NavDropdown.Item>
                                    <NavDropdown.Item >Log out</NavDropdown.Item>
                                    <NavDropdown.Item >Profile</NavDropdown.Item>

                                </NavDropdown>
                            </>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;