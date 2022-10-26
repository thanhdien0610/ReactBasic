import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'
import { useState } from "react";
import TableUser from "./TableUser";



const ManageUsers = (props) => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false);

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
                    />
                </div>

                <div className="table-users-container">
                    <TableUser />

                </div>
            </div>
        </div>
    )
}

export default ManageUsers;