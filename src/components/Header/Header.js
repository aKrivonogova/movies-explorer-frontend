import Navigation from "../Navigation/Navigation.js"
import logo from "../../images/logo.svg"
import MobileMenuButton from "../MobileMenuButton/MobileMenuButton.js"
import './Header.css'

function Header({ loggedIn, handleOpenMenu }) {
    return (
        <header className={loggedIn ? 'header' : 'header content-between'}>
            <img className="header__logo" alt="логотип сайта" src={logo} />
            <Navigation loggedIn={loggedIn} />
            {
                loggedIn && <MobileMenuButton handleOpenMenu={handleOpenMenu} />
            }
        </header>
    )
}

export default Header;