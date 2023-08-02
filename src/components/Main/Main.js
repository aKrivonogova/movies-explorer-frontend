import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import AboutProject from '../AboutProject/AboutProject';
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
function Main(props) {
    return (
        <>
            <Promo></Promo>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
        </>
    )
}

export default Main;