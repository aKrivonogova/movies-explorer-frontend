import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <>
            <section className="not-found">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__subtitle">Страница не найдена</p>
                <span onClick={() => navigate(-1)} className="not-found__link">
                    Назад
                </span>
            </section>
        </>
    );
}

export default NotFound;
