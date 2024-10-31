import { Carousel, Button, TextInput, Label} from "flowbite-react"

function Slideshow() {
    return (
        <div className="flex justify-between p-4 bg-gray-100 space-x-4">
            <ImageSlideshow />
            <ImageInfo />
        </div>
    );
}

function ImageSlideshow() {
    return (
        <div className="flex-grow h-96 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={5000}>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..."/>
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..."/>
            </Carousel>
        </div>
    )
}

function ImageInfo() {
    return (
        <div className="flex-grow-0 text-left w-2/5">
            <div className="p-4 bg-stone-300">
                <p className="text-xl">Auction</p>
                <p className="text-sm">Est: $400 - $1200 USD</p>
                <p className="text-xs pt-10 underline underline-offset-2">Register for Live Auction!</p>
            </div>
            <div className="grid gap-y-2 pt-4">
                <p className="text-base font-medium">A172 September 2024, Asian Art, Jewelry, Accessories &
                    Watches</p>
                <p className="">September 17, 2024, 09:00 AM CET</p>
                <p className="">Auction is live. Bid now!</p>
            </div>
            <form>
                <div className="flex flex-col">
                    <div className="mb-2 block">
                        <Label htmlFor="input1" value="Your Bid" />
                    </div>
                    <TextInput id="input1" type="number" placeholder="Bid" required />
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default Slideshow;