import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import './Header.css'
import LoginButton from "../../UI/LoginButton/LoginButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import Logout from "../../../Pages/Logout/Logout";
import AccountFund from "../../UI/AccountFund/AccountFund";


const Header = () => {

    const navigate = useNavigate()

    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) return null

    const links = [
        { id: 'sports', label: 'Sports', path: '/sports', end: true },
        { id: 'promotions', label: 'Promotions', path: '/promotions'},
        { id: 'blog', label: 'Blog', path: '/blog'},
        { id: 'application', label: 'App', path: '/app'},
        { id: 'results', label: 'Results', path: '/results'},
    ]

    const redirectToRegister = () => {
        return navigate('/register')
    }

    const redirectToDeposit = () => {
        return navigate('deposit')
    }

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
                {isAuthenticated ? (

                    <>

                        < AccountFund /> 
                        <button
                            onClick={redirectToDeposit}
                        >
                            Deposit
                        </button>

                        <button>
                            Bet History
                        </button>
                        <Logout />

                    </>
                ) : (
                    
                    <>
                        <LoginButton/>
                        <button
                            className="register-btn"
                            onClick={redirectToRegister}
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;