import Navigation from "../Navigation/Navigation.js";
import LogoLink from "../LogoLink/LogoLink.js";
import "./Header.css";
import MobileMenu from "../MobileMenu/MobileMenu.js";

function Header({ isLoggedIn }) {
    return (
        <>
            <header
                className={isLoggedIn ? "header" : "header content-between"}
            >
                <LogoLink />
                <Navigation isLoggedIn={isLoggedIn} />
                {isLoggedIn ? <MobileMenu /> : null}
            </header>
        </>
    );
}

export default Header;
