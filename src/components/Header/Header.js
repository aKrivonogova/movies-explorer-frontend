import Navigation from "../Navigation/Navigation.js"
import LogoLink from "../LogoLink/LogoLink.js"
import MobileMenu from "../MobileMenu/MobileMenu.js"
import './Header.css'
function Header({ isLoggedIn }) {
    return (
        <>
            <Header>
                <LogoLink />
                <Navigation isLoggedIn={isLoggedIn} />
                {
                    isLoggedIn ? <MobileMenu /> : null
                }
            </Header>
        </>
    )
}

export default Header;