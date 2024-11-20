import { Carousel, Button, TextInput, Label} from "flowbite-react"

export function ImageSlideshow() {
    return (
        <div className="aspect-video">
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

export function ImageInfo() {
    return (
        <div className="text-left">
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