import Header from "../Header/Header";
import { Link } from "react-router-dom";
import React from "react";
import './Profile.css'
function Profile({ loggedIn }) {
    const [isFormDisabled, setIsFormDisabled] = React.useState(true);

    function handleEditProfileClick(event) {
        event.preventDefault();
        setIsFormDisabled(false);
    }

    return (
        <>
            <Header loggedIn={loggedIn}></Header>
            <section className="profile">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, Виталий!</h2>
                    <form className="profile__form">
                        <fieldset className="profile__fields">
                            <div className="profile__input-container">
                                <p className="profile__input-name">Имя</p>
                                <input type="text" className="profile__input" placeholder="Виталий" disabled={isFormDisabled} />
                            </div>
                            <div className="profile__input-container">
                                <p className="profile__input-name">E-mail</p>
                                <input type="text" className="profile__input" placeholder="pochta@yandex.ru" disabled={isFormDisabled} />
                            </div>
                        </fieldset>
                        <span className={isFormDisabled ? 'profile__form-error profile__form-error-hidden' : 'profile__form-error'}>При обновлении профиля произошла ошибка.</span>
                        {isFormDisabled ? <button className="profile__button profile__button_type_edit" onClick={handleEditProfileClick}>Редактировать</button> :
                            <button className="profile__button profile__button_type_save">Сохранить</button>}
                    </form>
                    <Link to="/" className={isFormDisabled ? 'profile__signout-link' : 'profile__signout-link profile__signout-link-hidden'}>Выйти из аккаунта</Link>
                </div>
            </section>

        </>
    )
}

export default Profile;