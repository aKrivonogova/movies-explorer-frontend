import './Portfolio.css'
import arrowImage from '../../images/arrowSvg.svg'
function Portfolio() {
    let portfolioData = require('../../resources/portfolioSectionData.json');
    return (
        <>
            <section className="portfolio">
                <div className='portfolio__container'>
                    <h4 className="portfolio__title">{portfolioData.portfolioTitle}</h4>
                    <ul className="portfolio__list">
                        {
                            portfolioData.portfolioList.map((portfolioItem, index) => (
                                <li className="portfolio__item">
                                    <a href={portfolioItem.jobLinkPath} alt="ссылка на работу" className='portfolio__link'>
                                        <p className="portfolio__item-title">{portfolioItem.jobName}</p>
                                        <img src={arrowImage} alt="стрелка" className="portfolio__item-arrow" />
                                    </a>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </section >
        </>
    )
}

export default Portfolio;