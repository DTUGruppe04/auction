import { Carousel } from "flowbite-react"

function Slideshow() {
    return (
        <div className="flex justify-between p-4 bg-gray-100 space-x-4">
            <div className="flex-grow h-96 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slideInterval={5000}>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..."/>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..."/>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..."/>
                    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..."/>
                </Carousel>
            </div>
            <div className="flex-grow-0 text-left w-2/5">
                <div className="p-4 bg-stone-400">
                    <p className="text-xl">Auction</p>
                    <p className="text-sm">Est: $400 - $1200 USD</p>
                </div>
            </div>
        </div>
    );
}




/*
function Slideshow() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={5000}>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..."/>
            </Carousel>
        </div>
    );
}
 */


export default Slideshow;