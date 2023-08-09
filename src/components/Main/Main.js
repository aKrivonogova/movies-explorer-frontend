import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main({ isLoggedIn }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn}></Header>
            <Promo></Promo>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
            <Footer></Footer>
        </>
    );
}

export default Main;
