import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../Context/Context";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { emailPattern } from '../../utils/constants/emailPattern';
import PopupMessage from '../PopupMessage/PopupMessage';
import * as statusMessage from '../../utils/constants/statusMessage'

import React from "react";
import { updateUserInfo } from "../../utils/api/MainApi";
import './Profile.css'

function Profile({ isLoggedIn, setIsLoggedIn, setCurrentUser }) {
    const navigate = useNavigate();
    const [isOpenPopupMessage, setIsOpenPopupMessage] = useState(false);
    const [infoPopupMessage, setInfoPopupMessage] = useState({
        image: null,
        text: null
    })
    const [imagePopup, setImagePopup] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    const [isFormEditDisabled, setIsFormEditDisabled] = useState(true);

    const handleOpenPopupMessage = () => {
        setIsOpenPopupMessage(true);
    }

    const handleClosePopupMessage = () => {
        setIsOpenPopupMessage(false);
    }

    const handleEditProfileClick = (event) => {
        event.preventDefault();
        setIsFormEditDisabled(false);
    }

    const handleUpdateUser = (event) => {
        event.preventDefault();
        onUpdateUser(values);
    }

    const onUpdateUser = ({ name, email }) => {
        updateUserInfo(name, email).then((res) => {
            setCurrentUser(res);
            handleOpenPopupMessage();
            setInfoPopupMessage({
                image: statusMessage.successfullyStatus.image,
                text: statusMessage.successfullyStatus.text
            })
            setIsFormEditDisabled(true);
        })
            .catch((err) => {
                handleOpenPopupMessage();
                setInfoPopupMessage({
                    image: statusMessage.errorStatus.image,
                    text: statusMessage.errorStatus.text
                })
                setIsFormEditDisabled(true);
            })
    }

    const handleLogOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/', { replace: true });
    }


    useEffect(() => {
        if (currentUser)
            resetForm(currentUser);
        setErrorMessage('');
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
                                <input type="email"
                                    pattern={emailPattern}
                                    className="profile__input" onChange={handleChange} value={values.email ?? currentUser.email} disabled={isFormEditDisabled} name="email" />
                                <span className="profile__input-error">{errors.email}</span>
                            </div>
                        </fieldset>

                        {isFormEditDisabled ? (
                            <button className="profile__button profile__button_type_edit" onClick={handleEditProfileClick}>
                                Редактировать
                            </button>
                        ) : (
                            <>
                                <button className="profile__button profile__button_type_save" onClick={handleUpdateUser} disabled={!isValid}>
                                    Сохранить
                                </button>
                            </>
                        )}
                    </form>
                    <Link to="/" onClick={handleLogOut} className={isFormEditDisabled ? 'profile__signout-link' : 'profile__signout-link profile__signout-link-hidden'}>Выйти из аккаунта</Link>
                </div>
            </section>
            <PopupMessage isOpenPopupMessage={isOpenPopupMessage} message={infoPopupMessage} onClosePopupMessage={handleClosePopupMessage} />
        </>
    )
}

export default Profile;