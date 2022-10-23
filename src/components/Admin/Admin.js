import SideBar from "./SideBar";
import './Admin.scss'
import { useState } from "react";
import { FaHeart, FaBars } from 'react-icons/fa';
import { ProSidebarProvider } from "react-pro-sidebar";
const Admin = (props) => {
    // const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <ProSidebarProvider className="admin-sidebar">
                <SideBar />
            </ProSidebarProvider>;
            {/* <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div> */}
            <div className="admin-content">
                {/* <FaBars onClick={() => setCollapsed(!collapsed)} /> */}
                contain
            </div>
        </div>
    )
}

export default Admin;