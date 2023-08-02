import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import './LogoLink.css'
function LogoLink() {
    return (
        <>
            <Link className="logo-link" to="/"><Logo /></Link>
        </>
    )
}

export default LogoLink;