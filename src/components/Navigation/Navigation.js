import './Navigation.css';
import React from "react";
import { Link } from 'react-router-dom';
import * as routes from '../../utils/links';

function Navigation(props) {
    const hederNavigationClass = `header__navigation ${props.isLoggedIn ? ('authorized') : ('no-authorized')}`;
    const navigationLinks = props.isLoggedIn ? routes.protectedRoutes : routes.authRoutes;
    return (
        <>
            <div className='header__content'>
                <nav className={hederNavigationClass}>
                    {
                        navigationLinks.map((pathItem, index) => (
                            <Link key={index} to={pathItem.path} className='header__link'>{pathItem.pathName}</Link>
                        ))
                    }
                </nav>
            </div>
        </>
    )
}

export default Navigation;