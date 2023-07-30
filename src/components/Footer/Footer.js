import './Footer.css'
function Footer() {
    let footerData = require('../../resources/footerData.json')
    return (
        <>
            <footer class="footer">
                <div className='footer__container'>
                    <h3 class="footer__title">
                        {footerData.footerTitle}
                    </h3>
                    <div class="footer__nav">
                        <p class="footer__copyright">&copy; {footerData.footerYear}</p>
                        <ul class="footer__links">
                            {
                                footerData.footerLinks.map((link, index) => (
                                    <li key={index} className='footer__link-item'>
                                        <a  className='footer__link' href={link.footerLinkPath}>{link.footerLinkTitle}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer; 