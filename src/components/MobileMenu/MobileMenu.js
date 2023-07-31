import './MobileMenu.css'
import { NavLink } from 'react-router-dom';
import { links, profileLink } from '../../utils/mobileLinks'
function MobileMenu({ isMobileMenuOpen, handleCloseMobileMenu }) {
    return (
        <>
            <div className={`mobile-menu ${isMobileMenuOpen ? "mobile-menu_visible" : ""}`}>
                <button className="mobile-menu__button" onClick={handleCloseMobileMenu}></button>
                <div className="mobile-menu__container">
                    <nav className="mobile-menu__navigation">
                        <ul className='mobile-menu__links'>

                            {
                                links.map((link, index) => (
                                    <li key={index} className="mobile-menu__link-item">
                                        <NavLink
                                            className={({ isActive }) => `mobile-menu__link ${isActive ? "mobile-menu__link_active" : ""}`}
                                            to={link.linkPath}
                                        >{link.linkName}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <NavLink to={profileLink.linkPath} className="mobile-menu__profile-button">{profileLink.linkName}</NavLink>
                </div>
            </div>
        </>
    )
}

export default MobileMenu;