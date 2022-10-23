import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'
import sidebarBg from '../../assets/bg2.jpg';
import './SideBar.scss'
import { Link } from 'react-router-dom';
const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                // image={sidebarBg}

                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span> MySideBar</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        // suffix={<span className="badge red">New</span>}
                        >

                            Dashboard
                            <Link to="/admins"> </Link>
                        </MenuItem>


                    </Menu>

                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            title="Features"
                            icon={<FaGem />}
                        >
                            <MenuItem>
                                Quản lý Users
                                <Link to="/admins/manage-users"> </Link>
                            </MenuItem>
                            <MenuItem> Quản lý Quiz</MenuItem>
                            <MenuItem> Quản lý Questions</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/sylver0610"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >

                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; Thanh Điển
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>


    )
}

export default SideBar;