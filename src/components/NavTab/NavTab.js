import './NavTab.css'
function NavTab(props) {
    return (
        <>
            <li className="promo__link-item">
                <a className="promo__link" href={props.linkPath}>
                    {props.linkName}</a></li>
        </>
    )
}

export default NavTab;