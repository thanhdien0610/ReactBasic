import SideBar from "./SideBar";
import './Admin.scss'
import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)} className='left-side'>
                        <FaBars />
                    </span>
                    <div className="right-side">
                        <Language />
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item  >Log out</NavDropdown.Item>
                        </NavDropdown>


                    </div>

                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>

                </div>



            </div>

        </div>
    )
}

export default Admin;