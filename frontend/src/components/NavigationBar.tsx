import { Button, Navbar } from "flowbite-react";

function NavigationsBar() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="#">
                <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="DTU Auction Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DTU Auction</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button>Get started</Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">Browse</Navbar.Link>
                <Navbar.Link href="#">Sell</Navbar.Link>
                <Navbar.Link href="#">About Us</Navbar.Link>
                <Navbar.Link href="#">Help/Support</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationsBar;