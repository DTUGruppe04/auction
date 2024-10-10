import {Carousel, Col, Container, Row} from "react-bootstrap";

function Auction() {
    return (
        <SiteCarousels/>
    )
}

function SiteCarousels() {
    return (
        <Carousel>
            <Carousel.Item>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}


export default Auction