import { getLoginFailed, getLoginStart, getLoginSuccess } from "../redux/slice/userSlice";
import axios from "../utils/axiosCustomize";
import { toast } from 'react-toastify';
const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    console.log('check', data.get(id));
    return axios.put('api/v1/participant', data)
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = async (email, password, dispatch, navigate) => {
    dispatch(getLoginStart())
    try {
        const res = await axios.post(`api/v1/login`, { email, password });
        // console.log(res);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(getLoginSuccess(res.DT));
            navigate('/')
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM)
            dispatch(getLoginFailed());
        }

    } catch (error) {
        dispatch(getLoginFailed());
    }

}

const registerUser = (username, email, password) => {
    return axios.post(`api/v1/register`, { email, username, password });
}

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate,
    postLogin,
    registerUser
}