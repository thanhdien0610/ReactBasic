import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'



const ManageUsers = (props) => {


    return (
        <div className="manage-users-container">
            <div className="title">
                Manage Users
            </div>
            <div className="users-content">
                <ModalCreateUser />
                <div> Table users</div>
            </div>
        </div>
    )
}

export default ManageUsers;