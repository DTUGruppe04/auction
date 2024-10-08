import "./Navbar.css"

function Navbar() {
    return (
        <>
            <Nav />
        </>
    )
}

function Nav() {
    return (
        <>
            <ul>
                <li className={"liLeft active"}>
                    <p>Home</p>
                </li>
                <li className={"liLeft"}>
                    <p>Browse</p>
                </li>
                <li className={"liLeft"}>
                    <p>FAQ</p>
                </li>
                <li className={"liLeft"}>
                    <p>About Us</p>
                </li>
                <li className={"liRight"}>
                    <p>Search</p>
                </li>
            </ul>
        </>
    )
}

export default Navbar