import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    let notFoundInfo = require('../../resources/notFoundSection.json');
    return (
        <>
            <section className="not-found">
                <h2 className="not-found__title">{notFoundInfo.notFoundTitle}</h2>
                <p className="not-found__subtitle">{notFoundInfo.notFoundDescription}</p>
                <span onClick={() => navigate(-1)} className="not-found__link">
                    {notFoundInfo.notFoundButtonText}
                </span>
            </section>
        </>
    );
}

export default NotFound;
