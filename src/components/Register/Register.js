import LogoLink from '../LogoLink/LogoLink';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/formValidation';
import './Register.css'
function Register({ handleRegister, errorMessage }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const handleRegisterFormSubmit = (event) => {
        event.preventDefault();
        handleRegister(values)
    }
    return (
        <>
            <section className="register auth">
                <div className='register__container auth__container'>
                    <LogoLink />
                    <h2 className='register__title auth__title'>Добро пожаловать!</h2>
                    <form className='register__form auth__form' onSubmit={handleRegisterFormSubmit}>
                        <fieldset className="register__fieldset auth__fieldset">
                            <p className="register__input-name auth__input-name">Имя</p>
                            <input type="text" className="login__input auth__input" placeholder='Имя' required
                                name="name"
                                value={values.name || ''}
                                onChange={handleChange}
                            />
                            <span className="register__error auth__error">{errors.name}</span>
                            <p className="register__input-name auth__input-name" >E-mail</p>
                            <input type="email" className="login__input auth__input"
                                name="email"
                                value={values.email || ''}
                                onChange={handleChange}
                                placeholder='E-mail' required />
                            <span className="register__error auth__error">{errors.email}</span>
                            <p className="register__input-name auth__input-name">Пароль</p>
                            <input type="password" className="login__input auth__input"
                                name="password"
                                value={values.password || ''}
                                onChange={handleChange}
                                placeholder='Пароль' required minLength="8" />
                            <span className="register__error auth__error">{errors.password}</span>
                        </fieldset>
                        <span className="auth__error submit-error">{errorMessage}</span>
                        <button className="register__submit-button auth__submit-button" disabled={!isValid}>Зарегистрироваться</button>
                        <h4 className='register__subtitle auth__subtitle'>Уже зарегистрированы?
                            <Link className="register__link auth__link" to="/signin"> Войти</Link></h4>
                    </form>
                </div>
            </section >
        </>
    )
}

export default Register; 