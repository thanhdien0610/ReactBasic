import SideBar from "./SideBar";
import './Admin.scss'
import { useState } from "react";
import { FaHeart, FaBars } from 'react-icons/fa';
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
const Admin = (props) => {
    // const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <ProSidebarProvider className="admin-sidebar">
                <SideBar />
            </ProSidebarProvider>
            {/* <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div> */}
            <div className="admin-content">
                <div className="admin-header">

                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin;