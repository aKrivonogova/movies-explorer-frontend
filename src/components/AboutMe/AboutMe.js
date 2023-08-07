import './AboutMe.css'
import studentImage from '../../images/studentImage.jpg';

function AboutMe() {
    let aboutMeData = require('../../resources/aboutMeSectionData.json');
    return (
        <>
            <section className="aboutMe section" id="aboutMe">
                <div className='aboutMe__container'>
                    <h3 className='aboutMe__heading section__heading'>{aboutMeData.aboutMeHeading} </h3>
                    <div className='aboutMe__content'>
                        <div className='aboutMe__information'>
                            <h2 className='aboutMe__title'>{aboutMeData.aboutMeTitle}</h2>
                            <p className='aboutMe__subtitle'>{aboutMeData.aboutMeDescription}</p>
                            <p className='aboutMe__description'>{aboutMeData.aboutMeInformation}</p>
                            <a rel="noreferrer" href={aboutMeData.aboutMeLinkPath} target="_blank" alt="ссылка на gitHub" className='aboutMe__link'>{aboutMeData.aboutMeLink}</a>
                        </div>
                        <img src={studentImage} alt="" className="aboutMe__image" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutMe;