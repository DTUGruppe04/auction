import {Navbar, Nav, Container, Row, Col} from "react-bootstrap";

function TestNavbar() {
    return (
        <>
            <MyNavbar />
        </>
    )
}


function MyNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="sm" className="bg-body-tertiary">
            <Container fluid>
                <Row className="w-100">
                    <Col xs="auto">
                        <Navbar.Brand href="/">DTU Auction</Navbar.Brand>
                    </Col>
                    <Col>
                        <Nav className="justify-content-end">
                            <Nav.Link href="#browse">Browse</Nav.Link>
                            <Nav.Link href="#faq">FAQ</Nav.Link>
                            <Nav.Link href="#about">About Us</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default TestNavbar