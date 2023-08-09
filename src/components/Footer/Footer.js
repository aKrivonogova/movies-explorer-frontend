import "./Footer.css";
function Footer() {
    const footerData = require("../../resources/footerData.json");
    return (
        <>
            <footer className="footer">
                <div className="footer__container">
                    <h3 className="footer__title">{footerData.footerTitle}</h3>
                    <div className="footer__nav">
                        <p className="footer__copyright">
                            &copy; {footerData.footerYear}
                        </p>
                        <ul className="footer__links">
                            {footerData.footerLinks.map((link) => (
                                <li key={link.id} className="footer__link-item">
                                    <a
                                        rel="noreferrer"
                                        target="_blank"
                                        className="footer__link"
                                        href={link.footerLinkPath}
                                    >
                                        {link.footerLinkTitle}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
