import './NavTab.css'
function NavTab(props) {
    return (
        <>
            <a className="promo__link" href={props.linkPath}>
                <li className="promo__link-item"> {props.linkName}</li >
            </a>
        </>
    )
}

export default NavTab;