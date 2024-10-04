import "./Navbar.css"

function Navbar() {
    return (
        <>
            <UpperNav />
            <UnderNav />
        </>
    )
}

function UpperNav() {
    return (
        <>
            <ul className={"ulUpper"}>
                <li>
                    <p>SiteLogo</p>
                </li>
                <li>
                    <p>Search</p>
                </li>
                <li>
                    <p>Login Buttons</p>
                </li>
            </ul>
        </>
    )
}

function UnderNav() {
    return (
        <>
            <ul>
                <li>
                    <p>About</p>
                </li>
                <li>
                    <p>Features</p>
                </li>
                <li>
                    <p>Pricing</p>
                </li>
                <li>
                    <p>Gallery</p>
                </li>
                <li>
                    <p>Team</p>
                </li>
            </ul>
        </>
    )
}

export default Navbar