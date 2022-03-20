import React, { useState } from 'react';
import LogOutModal from './Modal'

import { Link, useNavigate } from 'react-router-dom'
export default function Nav({ authLogout, is_authenticated, userAdmin, authLoader }) {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const logoutAction = () => {
        setActive(true)
    }
    const modalMethod = () => {
        authLogout()
        navigate("/")
        setActive(false)
    }
    const closeModal = () => {
        setActive(false)
    }
    var title = "Log Out"
    var info = "Are you sure you want to log out?"
    var action = "Logout"
    const args = {
        modalMethod, title, info, action, active, closeModal
    }
    return (
        <React.Fragment>
            <nav className="navbar navbar-light navbar-expand-lg  fixed-top py-3">
                <div className="container">
                    <a className="navbar-brand" href="/home">Django-react</a>
                    {authLoader && <div className="spinner-border text-primary" role="status"></div>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Django-react</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Home</Link>
                                </li>
                                {is_authenticated &&
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/profile">Profile</Link>
                                    </li>
                                }
                                {userAdmin ?
                                    <li className="nav-item">
                                        <Link className="nav-link text-success" to="/admin">Admin</Link>
                                    </li>:''
                                }
                                {!is_authenticated &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/authentication/login">Sign in</Link>
                                    </li>
                                }
                                {is_authenticated && <button className="btn btn-dark btn-sm px-4 mt-2" onClick={logoutAction}>Logout</button>}

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <LogOutModal {...args} />
        </React.Fragment>
    )
}
