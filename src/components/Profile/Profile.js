import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../Context/Context";
import { useFormWithValidation } from "../../utils/formValidation";
import React from "react";
import { updateUserInfo } from "../../utils/MainApi";
import './Profile.css'

function Profile({ isLoggedIn, setIsLoggedIn, setCurrentUser }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    const [isFormEditDisabled, setIsFormEditDisabled] = useState(true);

    const handleEditProfileClick = (event) => {
        event.preventDefault();
        setIsFormEditDisabled(false);
    }

    const handleUpdateUser = (event) => {
        event.preventDefault();
        onUpdateUser(values);
    }

    const onUpdateUser = ({ name, email }) => {
        console.log(name);
        console.log(email)
        updateUserInfo(name, email).then((res) => {
            setCurrentUser(res);
            setErrorMessage('Обновление прошло успешно!');
            setIsFormEditDisabled(true);
        })
            .catch((err) => {
                setErrorMessage(err);
            })
    }

    const handleLogOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        navigate('/', { replace: true });
    }


    useEffect(() => {
        if (currentUser)
            resetForm(currentUser);
    }, [currentUser, resetForm]);

    useEffect(() => {
        if (values.name === currentUser.name && values.email === currentUser.email) {
            resetForm(values, {}, false);
        }
    }, [values]);


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
                                <input type="text" className="profile__input" onChange={handleChange} value={values.name ?? currentUser.name} disabled={isFormEditDisabled} name="name" required minLength='3' />
                                <span className="profile__input-error">{errors.name}</span>
                            </div>
                            <div className="profile__input-container">
                                <p className="profile__input-name">E-mail</p>
                                <input type="email" className="profile__input" onChange={handleChange} value={values.email ?? currentUser.email} disabled={isFormEditDisabled} name="email" />
                                <span className="profile__input-error">{errors.email}</span>
                            </div>
                        </fieldset>
                        <span className={'profile__form-error profile__form-error-hidden profile__form-error'}>При обновлении профиля произошла ошибка.</span>
                        {isFormEditDisabled ? (
                            <button className="profile__button profile__button_type_edit" onClick={handleEditProfileClick}>
                                Редактировать
                            </button>
                        ) : (
                            <button className="profile__button profile__button_type_save" onClick={handleUpdateUser} disabled={!isValid}>
                                Сохранить
                            </button>
                        )}
                    </form>
                    <Link to="/" onClick={handleLogOut} className={isFormEditDisabled ? 'profile__signout-link' : 'profile__signout-link profile__signout-link-hidden'}>Выйти из аккаунта</Link>
                </div>
            </section>
        </>
    )
}

export default Profile;