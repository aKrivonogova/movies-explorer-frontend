import NavTab from "../NavTab/NavTab";
import './Promo.css'
function Promo(props) {
    let promoData = require('../../resources/promoSectionData.json');
    return (
        <>
            <section className="promo">
                <div className="promo__container">
                    <h1 className="promo__title">
                        {promoData.promoTitle}
                    </h1>
                    <ul className="promo__links">
                        {
                            promoData.promoLinks.map((link, index) => (
                                <NavTab key={index} linkName={link.linkName} linkPath={link.linkPath} />
                            ))
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Promo;