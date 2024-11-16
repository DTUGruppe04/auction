import {Carousel, Button, TextInput, Label} from "flowbite-react"
import {ArtPiece} from "../types/ArtPiece.ts"

interface ImageProps {
    item: ArtPiece
}

export const ImageSlideshow: React.FC<ImageProps> = ({item}) => {
    return (
        <div className="aspect-video">
            <Carousel slideInterval={5000}>
                {item.pictureUrls.map((item) => (
                    <img src={item} alt="..." />
                ))}
            </Carousel>
        </div>
    )
}

export const ImageInfo: React.FC<ImageProps> = ({item}) => {
    return (
        <div className="text-left">
            <div className="p-4 bg-stone-300">
                <p className="text-xl">Auction</p>
                <p className="text-sm">Est: ${item.estimatedValue} USD</p>
                <p className="text-xs pt-10 underline underline-offset-2">Register for Live Auction!</p>
            </div>
            <div className="grid gap-y-2 pt-4">
                <p className="text-base font-medium">{item.address}</p>
                <p className="">{item.auctionStart}</p>
                <p className="">Auction is live. Bid now!</p>
            </div>
            <form>
                <div className="flex flex-col">
                    <div className="mb-2 block">
                        <Label htmlFor="input1" value="Your Bid"/>
                    </div>
                    <TextInput id="input1" type="number" placeholder="Bid" required/>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}