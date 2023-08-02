import LogoLink from '../LogoLink/LogoLink';
import { Link } from 'react-router-dom';
import './Login.css'
function Login() {
    return (
        <>
            <section className="login auth">
                <div className='login__container auth__container'>
                <LogoLink/>
                    <h2 className='login__title auth__title'>Рады видеть!</h2>
                    <form className='login__form auth__form' noValidate>
                        <fieldset className="login__fieldset auth__fieldset">
                            <p className="login__input-name auth__input-name" >E-mail</p>
                            <input type="email" className="login__input auth__input" placeholder='E-mail' required />
                            <span className="login__error auth__error"></span>
                            <p className="login__input-name auth__input-name" >Пароль</p>
                            <input type="password" className="login__input auth__input" placeholder='Пароль' required minLength="8" />
                            <span className="login__error auth__error"> </span>
                        </fieldset>
                        <button className="login__submit-button auth__submit-button" disabled>Войти</button>
                        <h4 className='login__subtitle auth__subtitle'>Ещё не зарегистрированы?
                            <Link className="login__link auth__link" to="/signup"> Регистрация</Link></h4>
                    </form>
                </div>
            </section >
        </>
    )
}

export default Login; 