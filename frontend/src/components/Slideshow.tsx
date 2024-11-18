import {Button, Carousel, Label, TextInput} from "flowbite-react";
import {Auction} from "../types/Auction.ts";

interface ImageProps {
    item: Auction;
}

export const ImageSlideshow: React.FC<ImageProps> = ({ item }) => {
    return (
        <div className="aspect-video bg-gray-900">
            <Carousel slideInterval={5000}>
                <img src={item.artPiece.pictureUrl} alt={item.artPiece.name} className="w-full h-full object-contain" />
            </Carousel>
        </div>
    );
};

export const ImageInfo: React.FC<ImageProps> = ({item}) => {
    return (
        <div className="text-left">
            <div className="p-4 bg-stone-300">
                <p className="text-xl">Auction</p>
                <p className="text-sm">Est: {item.artPiece.estimatedValue} DKK</p>
                <p className="text-xs pt-10 underline underline-offset-2">Register for Live Auction!</p>
            </div>
            <div className="grid gap-y-2 pt-4">
                <p className="text-base font-medium">test123</p>
                <p className="">Auction start: {new Date(item.startDateTime).toLocaleString()}</p>
                <p className="">Auction end: {new Date(item.endDateTime).toLocaleString()}</p>
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