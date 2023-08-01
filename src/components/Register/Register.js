import LogoLink from '../LogoLink/LogoLink';
import { Link } from 'react-router-dom';
import './Register.css'
function Register() {
    return (
        <>
            <section className="register auth">
                <div className='register__container auth__container'>
                    <LogoLink/>
                    <h2 className='register__title auth__title'>Добро пожаловать!</h2>
                    <form className='register__form auth__form' noValidate>
                        <fieldset className="register__fieldset auth__fieldset">
                            <p className="register__input-name auth__input-name">Имя</p>
                            <input type="email" className="login__input auth__input" required />
                            <span className="register__error auth__error"></span>
                            <p className="register__input-name auth__input-name">E-mail</p>
                            <input type="email" className="login__input auth__input" required />
                            <span className="register__error auth__error"></span>
                            <p className="register__input-name auth__input-name">Пароль</p>
                            <input type="password" className="login__input auth__input" required minLength="8" />
                            <span className="register__error auth__error"></span>
                        </fieldset>
                        <button className="register__submit-button auth__submit-button">Зарегистрироваться</button>
                        <h4 className='register__subtitle auth__subtitle'>Уже зарегистрированы?
                            <Link className="register__link auth__link" to="/signin"> Войти</Link></h4>
                    </form>
                </div>
            </section >
        </>
    )
}

export default Register; 