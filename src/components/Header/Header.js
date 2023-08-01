import Navigation from "../Navigation/Navigation.js"
import LogoLink from "../LogoLink/LogoLink.js"
import MobileMenuButton from "../MobileMenuButton/MobileMenuButton.js"
import './Header.css'

function Header({ loggedIn, handleOpenMenu }) {
    return (
        <header className={loggedIn ? 'header' : 'header content-between'}>
            <LogoLink />
            <Navigation loggedIn={loggedIn} />
            {
                loggedIn && <MobileMenuButton handleOpenMenu={handleOpenMenu} />
            }
        </header>
    )
}

export default Header;