import React from 'react';
import {Link} from "react-router-dom";

import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link to="asset-pairs/" className="nav__link active-link">
                                    <i className='bx bx-home-alt nav__icon'></i>
                                    <span className="nav__name">Asset</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

        </div>
);
};

export default Navbar;