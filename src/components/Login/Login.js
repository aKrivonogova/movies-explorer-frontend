import LogoLink from "../LogoLink/LogoLink";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/api/MainApi";
import { emailPattern } from "../../utils/constants/emailPattern";
import "./Login.css";
function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleLoginFormSubmit(event) {
        event.preventDefault();
        handleLogin(values);
    }

    const handleLogin = ({ password, email }) => {
        login(password, email)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setIsLoggedIn(true);
                    navigate("/movies", { replace: true });
                }
            })
            .catch((error) => {
                if (error.status === 400) {
                    setErrorMessage("Введены неверные данные пользователя.");
                }
                if (error.status === 401) {
                    setErrorMessage("Пользователь с таким email не существует");
                } else {
                    setErrorMessage("Что-то пошло не так...");
                }
            });
    };

    return (
        <>
            <section className="login auth">
                <div className="login__container auth__container">
                    <LogoLink />
                    <h2 className="login__title auth__title">Рады видеть!</h2>
                    <form
                        className="login__form auth__form"
                        onSubmit={handleLoginFormSubmit}
                    >
                        <p className="login__input-name auth__input-name">
                            E-mail
                        </p>
                        <input
                            type="email"
                            className="login__input auth__input"
                            placeholder="E-mail"
                            required
                            value={values.email || ""}
                            onChange={handleChange}
                            name="email"
                            pattern={emailPattern}
                        />
                        <span className="login__error auth__error">
                            {errors.email}
                        </span>
                        <p className="login__input-name auth__input-name">
                            Пароль
                        </p>
                        <input
                            type="password"
                            className="login__input auth__input"
                            placeholder="Пароль"
                            required
                            minLength="8"
                            value={values.password || ""}
                            onChange={handleChange}
                            name="password"
                        />
                        <span className="login__error auth__error">
                            {errors.password}
                        </span>
                        <span className="auth__error submit-error">
                            {errorMessage}
                        </span>
                        <button
                            className="login__submit-button auth__submit-button"
                            disabled={!isValid}
                        >
                            Войти
                        </button>
                        <h4 className="login__subtitle auth__subtitle">
                            Ещё не зарегистрированы?
                            <Link
                                className="login__link auth__link"
                                to="/signup"
                            >
                                Регистрация
                            </Link>
                        </h4>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Login;
