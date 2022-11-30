// Import library
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdLogout, MdOutlineShoppingCart } from "react-icons/md";
import { RiShoppingBag3Line } from "react-icons/ri";

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
                        </NavLink>
                    </li>
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/user">
                            <HiOutlineUsers />
                        </NavLink>
                    </li>
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/product">
                            <RiShoppingBag3Line />
                        </NavLink>
                    </li>
                    <li className="sidebar--item">
                        <NavLink className="sidebar--link" to="/order">
                            <MdOutlineShoppingCart />
                        </NavLink>
                    </li>
                </ul>
                <button className="sidebar--button" onClick={handleClick}>
                    <MdLogout />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
