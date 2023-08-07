import './Techs.css'
function Techs() {
    let techsData = require('../../resources/techsSectionData.json');
    return (
        <>
            <section className="techs section" id='techs'>
                <div className='techs__container'>
                    <h3 className="techs__heading section__heading">{techsData.techsHeading}</h3>
                    <h1 className="techs__title">{techsData.techsTitle}</h1>
                    <p className="techs__subtitle">{techsData.techSibtitle}</p>
                    <ul className="techs__list">
                        {techsData.techsList.map((techItem, index) => (
                            <li key={index} className='techs__item'>{techItem}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Techs;