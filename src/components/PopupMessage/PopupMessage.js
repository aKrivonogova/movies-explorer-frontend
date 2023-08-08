import './PopupMessage.css';

function PopupMessage({ message, isOpenPopupMessage, onClosePopupMessage }) {

    const onClose = () => {
        onClosePopupMessage();
    }

    return (
        <>
            <div className={`popup ${isOpenPopupMessage ? 'popup_opened' : ''}`}>
                <div className="popup__container popup__container-tooltip">
                    <button className="popup__close-button" type="button" onClick={onClose}></button>
                    <img src={message.image} className="popup__tooltip-image" alt="картинка ответ сервера" />
                    <h3 className="popup__tooltip-text">{message.text}</h3>
                </div>
            </div>
        </>
    )
}

export default PopupMessage;