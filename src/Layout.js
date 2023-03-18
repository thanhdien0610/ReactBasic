import { Routes, Route } from "react-router-dom";
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUsers from './components/Admin/Content/ManageUsers';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from 'react';
const NotFound = () => {
    return (
        <div className="alert alert-danger mt-3 container" role="alert">
            Not found URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />

                </Route >
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>

                <Route path="/login" element={<Login />}> </Route>

                <Route path='/register' element={<Register />}>  </Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </Suspense>

    )
}
export default Layout;
