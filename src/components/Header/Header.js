import Navigation from "../Navigation/Navigation.js"
import logo from "../../images/logo.svg"
import './Header.css'

// Отрисовка шапки
function Header(props) {
    return (
        <header className={props.loggedIn ? 'header' : 'header content-between'}>
            <img className="header__logo" alt="логотип сайта" src={logo} />
            <Navigation loggedIn={props.loggedIn} />
        </header>
    )
}

export default Header;