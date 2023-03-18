import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {

    const isAuthenticated = useSelector(state => state.user?.isAuthenticated);
    //const navigate = useNavigate()
    if (!isAuthenticated) {
        //navigate('/login');
        return <Navigate to='/login'> </Navigate>
    }
    return (

        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;