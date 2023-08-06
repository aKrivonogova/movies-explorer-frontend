import Header from "../Header/Header";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../Context/Context";
import { useFormWithValidation } from "../../utils/formValidation";
import React from "react";
import './Profile.css'
function Profile({ isLoggedIn }) {
    const { values, handleChange, errors, setValues, setIsValid, isValid } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    console.log('user', currentUser);

    useEffect(() => {
        setValues({name: currentUser.name, email: currentUser.email});
    }, []);

    const [isFormEditDisabled, setIsFormEditDisabled] = useState(true);

    const handleEditProfileClick = (event) => {
        event.preventDefault();
        setIsFormEditDisabled(false);
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn}></Header>
            <section className="profile">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, {currentUser.name}!</h2>
                    <form className="profile__form">
                        <fieldset className="profile__fields">
                            <div className="profile__input-container">
                                <p className="profile__input-name">Имя</p>
                                <input type="text" className="profile__input" onChange={handleChange} value={values.name || ''} disabled={isFormEditDisabled} name="name"/>
                            </div>
                            <div className="profile__input-container">
                                <p className="profile__input-name">E-mail</p>
                                <input type="text" className="profile__input" onChange={handleChange} value={values.email || ''} disabled={isFormEditDisabled} name="email"/>
                            </div>
                        </fieldset>
                        <span className={'profile__form-error profile__form-error-hidden profile__form-error'}>При обновлении профиля произошла ошибка.</span>
                        {isFormEditDisabled ? <button className="profile__button profile__button_type_edit" onClick={handleEditProfileClick}>Редактировать</button> :
                            <button className="profile__button profile__button_type_save">Сохранить</button>}
                    </form>
                    <Link to="/" className={isFormEditDisabled ? 'profile__signout-link' : 'profile__signout-link profile__signout-link-hidden'}>Выйти из аккаунта</Link>
                </div>
            </section>

        </>
    )
}

export default Profile;