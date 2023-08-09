const { REACT_APP_BASE_URL_MOVIES } = process.env;

const checkResponse = (response) =>
    response.ok ? response.json() : Promise.reject(response.status);

export const getMovies = () => {
    return fetch(`${REACT_APP_BASE_URL_MOVIES}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
};
