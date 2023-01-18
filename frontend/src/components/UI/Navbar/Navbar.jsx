import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../../../index";

import DefaultButton from "../button/DefaultButton";

import './Navbar.css'

const Navbar = () => {
    const {store} = useContext(Context)
    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                    <div className="nav__menu wide" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link to="/" className="nav__link active-link">
                                    <i className='bx bx-home-alt nav__icon'></i>
                                    <span className="nav__name">About</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="asset-pairs/" className="nav__link active-link">
                                    <i className='bx bx-home-alt nav__icon'></i>
                                    <span className="nav__name">Market</span>
                                </Link>
                            </li>
                            <li>
                                {!store.isAuthenticated
                                    ? <h4>Authenticated</h4>
                                    : <DefaultButton onClick={() => store.logout()}>Log Out</DefaultButton>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;