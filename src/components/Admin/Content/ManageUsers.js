import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'

import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUser } from "../../../services/apiServices"


const ManageUsers = (props) => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([])

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }

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
                    <TableUser listUsers={listUsers} />

                </div>
            </div>
        </div>
    )
}

export default ManageUsers;