import './Logo.css';
import logo from '../../images/logo.svg';

function Logo() {
    return (
        <img src={logo} alt="логотип сайта" className="logo"/>
    )
}

export default Logo;