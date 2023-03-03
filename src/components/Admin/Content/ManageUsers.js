import ModalCreateUser from "./ModalCreateUser";
import './ManageUsers.scss'

import TableUser from "./TableUser";
import { useEffect, useState } from "react"
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";


const ManageUsers = (props) => {

    const [showModelCreateUser, setShowModelCreateUser] = useState(false);
    const [showModelUpdateUser, setShowModelUpdateUser] = useState(false);
    const [showModelViewUser, setShowModelViewUser] = useState(false);

    const [showModelDeleteUser, setShowModelDeleteUser] = useState(false);
    const [listUsers, setListUsers] = useState([])
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const limitUser = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, limitUser);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setDataUpdate(user);
        setShowModelUpdateUser(true);
    }

    const handleClickBtnView = (user) => {
        setDataView(user);
        setShowModelViewUser(true);
    }

    const handleClickBtnDelete = (user) => {
        setDataDelete(user)
        setShowModelDeleteUser(true);
    }


    useEffect(() => {
        fetchListUserWithPaginate(1);
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
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <div className="table-users-container">
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </div>
                <ModalUpdateUser
                    show={showModelUpdateUser}
                    setShow={setShowModelUpdateUser}
                    fetchListUser={fetchListUser}
                    dataUpdate={dataUpdate}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModelViewUser}
                    setShow={setShowModelViewUser}
                    dataView={dataView}
                />
                <ModalDeleteUser
                    show={showModelDeleteUser}
                    setShow={setShowModelDeleteUser}
                    fetchListUser={fetchListUser}
                    dataDelete={dataDelete}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUsers;