import './MobileMenuButton.css'

function MobileMenuButton({ handleOpenMenu }) {
    return (
        <>
            <button onClick={handleOpenMenu} className="mobile-menu__burger-button"></button>
        </>
    )
}

export default MobileMenuButton; 