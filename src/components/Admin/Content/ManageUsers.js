import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'

import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUser } from "../../../services/apiServices"
import ModalUpdateUser from "./ModalUpdateUser";


const ManageUsers = (props) => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);

    const [listUsers, setListUsers] = useState([])
    const [dataUpdate, setDataUpdate] = useState({});
    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setDataUpdate(user);
        setShowModelUpdateUser(true);
    }

    useEffect(() => {
        fetchListUser();
    }, [])

    return (
        <div className="manage-users-container">
            <div className="title">
                Manage Users
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModelCreateUser(true)}> Add new users</button>
                    <ModalCreateUser
                        show={showModelCreateUser}
                        setShow={setShowModelCreateUser}
                        fetchListUser={fetchListUser}
                    />
                </div>

                <div className="table-users-container">
                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}

                    />

                </div>
                <ModalUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModelUpdateUser}
                    fetchListUser={fetchListUser}
                    dataUpdate={dataUpdate}
                />
            </div>
        </div>
    )
}

export default ManageUsers;