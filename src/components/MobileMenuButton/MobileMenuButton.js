import "./MobileMenuButton.css";

function MobileMenuButton({ handleOpenMobileMenu }) {
    return (
        <>
            <button
                onClick={handleOpenMobileMenu}
                className="mobile-menu__burger-button"
            ></button>
        </>
    );
}

export default MobileMenuButton;
