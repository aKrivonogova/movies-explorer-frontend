import Header from "../Header/Header.js"

function Main(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} />
        </>

    )
}

export default Main;