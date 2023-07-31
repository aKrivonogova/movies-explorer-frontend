import './Logo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Logo() {
    return (
        <img src={logo} alt="логотип сайта" className="logo" />
    )
}

export default Logo;