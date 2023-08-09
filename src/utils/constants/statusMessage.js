import resolveImage from "../../images/resolve.svg";
import rejectImage from "../../images/reject.svg";

export const errorStatus = {
    text: "Произошла ошибка на сервере. Пожалуйста попробуйте еще раз!",
    image: rejectImage,
};

export const successfullyStatus = {
    text: "Обновление прошло успешно!",
    image: resolveImage,
};
