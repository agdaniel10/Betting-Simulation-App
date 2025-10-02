import React from "react";
import { useStat } from "react";
import { NavLink } from "react-router-dom";
import './Header.css'


const Header = () => {


    const links = [
        { id: 'sports', label: 'Sports', path: '/sports', end: true },
        { id: 'promotions', label: 'Promotions', path: '/promotions'},
        { id: 'blog', label: 'Blog', path: '/blog'},
        { id: 'application', label: 'App', path: '/app'},
        { id: 'results', label: 'Results', path: '/results'},
    ]

    return (
        <div className="Header-container">
            <div className="header-product-name">
                <h1>Bet<span className="first-span">P</span>erfect.<span className="second-span">ng</span></h1>
            </div>


            <div className="Header-links">
                <ul>
                    {links.map((link) => (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                                end={link.end}
                                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="login-register-container">
                <button 
                    className="login-btn"
                >
                    Login
                </button>
                <button className="register-btn">Register</button>
            </div>
        </div>
    )
}

export default Header;