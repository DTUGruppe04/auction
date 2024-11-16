import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="#">
                <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="DTU Auction Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DTU Auction</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Link to="/">
                    <Button>Login</Button>
                </Link>
                <Button color="failure" onClick={handleLogout} className="ml-2">
                    Logout
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link as={Link} to="/auctions">
                    Browse
                </Navbar.Link>
                <Navbar.Link as={Link} to="/createAuctionPage">Create Auction</Navbar.Link>
                <Navbar.Link href="#">About Us</Navbar.Link>
                <Navbar.Link href="#">Help/Support</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;