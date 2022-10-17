// Import library
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { MdLogout } from "react-icons/md";

// Import component
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
    const { signout } = useAuth();

    const navigate = useNavigate();

    const handleClick = () => {
        signout();
        navigate("/signin");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar--container">
                <Link to="/" className="sidebar--logo">
                    Shop
                </Link>
                <ul className="sidebar--menu">
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/" end>
                            <BiHomeAlt />
                            <span>dashboard</span>
                        </NavLink>
                    </li>
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/user">
                            <HiOutlineUser />
                            <span>người dùng</span>
                        </NavLink>
                    </li>
                </ul>
                <button className="sidebar--button" onClick={handleClick}>
                    <MdLogout />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
