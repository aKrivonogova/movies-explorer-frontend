import './AboutProject.css'

function AboutProject(props) {
    const aboutProjectData = require('../../resources/aboutProjectSectionData.json');
    return (
        <>
            <section className="aboutProject section" id='aboutProject'>
                <div className="aboutProject__container">
                    <h2 className="aboutProject__heading section__heading">
                        {aboutProjectData.aboutProjectHeading}
                    </h2>
                    <div className="aboutProject__info">
                        {
                            aboutProjectData.aboutProject.map((projectInfo) => (
                                <div key={projectInfo.id} className="aboutProject__info-block">
                                    <h3 className="info-block__title"> {projectInfo.projectInfoTitle}</h3>
                                    <p className="info-block__subtitle">{projectInfo.projectInfoSubtitle}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className="aboutProject__timeline">
                        {
                            aboutProjectData.aboutProjectTimeLine.map((timeLineBlock) => (
                                <div key={timeLineBlock.id} className={`timelane__view ${timeLineBlock.timeLineBlockClass}`}>
                                    <div className="timeline__process">
                                        <p className="timeline__title">{timeLineBlock.timeLineBlockTitle}</p>
                                    </div>
                                    <p className="timeline__subtitle">{timeLineBlock.timeLineBlockSubtitle}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

export default AboutProject;