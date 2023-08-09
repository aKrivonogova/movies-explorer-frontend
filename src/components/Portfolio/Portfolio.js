import "./Portfolio.css";
import arrowImage from "../../images/arrowSvg.svg";
function Portfolio() {
    const portfolioData = require("../../resources/portfolioSectionData.json");
    return (
        <>
            <section className="portfolio">
                <div className="portfolio__container">
                    <h4 className="portfolio__title">
                        {portfolioData.portfolioTitle}
                    </h4>
                    <ul className="portfolio__list">
                        {portfolioData.portfolioList.map((portfolioItem) => (
                            <li
                                key={portfolioItem.id}
                                className="portfolio__item"
                            >
                                <a
                                    href={portfolioItem.jobLinkPath}
                                    alt="ссылка на работу"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="portfolio__link"
                                >
                                    <p className="portfolio__item-title">
                                        {portfolioItem.jobName}
                                    </p>
                                    <img
                                        src={arrowImage}
                                        alt="стрелка"
                                        className="portfolio__item-arrow"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Portfolio;
