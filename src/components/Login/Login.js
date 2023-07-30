import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom';
import './Login.css'
function Login() {
    return (
        <>
            <section className="login">
                <div className='login__container auth__container'>
                    <Logo></Logo>
                    <h2 className='login__title auth__title'>Рады видеть!</h2>
                    <form className='login__form auth__form' noValidate>
                        <fieldset className="login__fieldset auth__fieldset">
                            <p className="login__input-name auth__input-name">E-mail</p>
                            <input type="email" className="login__input auth__input" required />
                            <span className="login__error auth__error"></span>
                            <p className="login__input-name auth__input-name">Пароль</p>
                            <input type="password" className="login__input auth__input" required minLength="8" />
                            <span className="login__error auth__error"></span>
                        </fieldset>
                        <button className="login__submit-button auth__submit-button">Войти</button>
                        <h4 className='login__subtitle auth__subtitle'>Ещё не зарегистрированы?
                            <Link className="login__link auth__link" to="/signin"> Регистрация</Link></h4>
                    </form>
                </div>
            </section >
        </>
    )
}

export default Login; 