export const authRoutes = [
    {
        path: '/sign-up',
        pathName: 'Регистрация'
    },
    {
        path: '/sign-in',
        pathName: 'Войти'
    }
]


export const protectedRoutes = [
    {
        path: '/movies',
        pathName: 'Фильмы'
    },
    {
        path: '/saved-movies',
        pathName: 'Сохраненные фильмы'
    },
    {
        path: '/profile',
        pathName: 'Аккаунт'
    }
]

export const promoLinks = [{
    linkName: 'О проекте'
},
{
    linkName: 'Технологии',
}, {
    linkName: 'Студент',
}
]