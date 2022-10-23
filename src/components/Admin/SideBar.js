import React from 'react';
//import 'react-pro-sidebar/dist/css/styles.css'
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import { FaGem, FaList, FaBars } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md'
import './Admin.scss'
import { Link, NavLink } from 'react-router-dom';
const SideBar = (props) => {
    const { collapseSidebar } = useProSidebar();
    return (
        <>

            <Sidebar>
                <Menu>
                    <MenuItem icon={<MdDashboard />}>
                        Dashboard
                        <Link to='/admins' />
                    </MenuItem>
                    {/* <MenuItem icon={<FaList />}> Calendar</MenuItem>
                    <MenuItem icon={<FaList />}> E-commerce</MenuItem> */}
                </Menu>
                <Menu>
                    <SubMenu className='subMenu'
                        // suffix={<span className="badge yellow">3</span>}
                        label="Features" icon={<FaGem />}>
                        <MenuItem>
                            Quản lý Users
                            <Link to='/admins/manage-users' />
                        </MenuItem>
                        <MenuItem> Quản lý Quiz </MenuItem>
                        <MenuItem> Quản lý câu hỏi </MenuItem>
                    </SubMenu>
                    {/* <MenuItem>Hahaha</MenuItem> */}
                </Menu>


            </Sidebar>
            <Menu className='sidebar'>
                <MenuItem icon={<FaBars />} onClick={() => collapseSidebar()}>  </MenuItem>
            </Menu>

        </>


    )
}

export default SideBar;