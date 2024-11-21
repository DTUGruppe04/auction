import {Button, Carousel, Label, TextInput} from "flowbite-react";
import {Auction} from "../types/Auction.ts";
import {useState} from "react";

interface AuctionProp {
    item: Auction;
}

export const ImageSlideshow: React.FC<AuctionProp> = ({ item }) => {
    return (
        <div className="aspect-video bg-gray-900">
            <Carousel slideInterval={5000}>
                <img src={item.artPiece.pictureUrl} alt={item.artPiece.name} className="w-full h-full object-contain" />
            </Carousel>
        </div>
    );
};

export const ImageInfo: React.FC<AuctionProp> = ({ item }) => {

    const [amount, setAmount] = useState("");

    const handleBid = async () => {
        const token = localStorage.getItem("token");
            if (!token) {
                console.error("User is not logged in");
                return;
            }

            try {
                const bidResponse = await fetch("http://localhost:5050/bid", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({amount, dateTime: new Date(), auctionID: item.auctionID}),
                });

                if(!bidResponse.ok) {
                    console.error("Failed to create bid");
                    return;
                }
            } catch (e) {
                console.error(e);
            }
    }

    return (
        <div className="text-left">
            <div className="p-4 bg-stone-300">
                <p className="text-xl">Auction</p>
                <p className="text-sm">Est: {item.artPiece.estimatedValue} DKK</p>
                <p className="text-xs pt-10 underline underline-offset-2">Register for Live Auction!</p>
            </div>
            <div className="grid gap-y-2 pt-4">
                <p className="text-base font-medium">Auction Lifetime: </p>
                <p className="">Auction start: {new Date(item.startDateTime).toLocaleString()}</p>
                <p className="">Auction end: {new Date(item.endDateTime).toLocaleString()}</p>
            </div>
            <form>
                <div className="flex flex-col">
                    <br></br>
                    <div className="mb-2 block">
                        <Label htmlFor="amount" value="Your Bid"/>
                    </div>
                    <TextInput
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Bid"
                        required
                    />
                    <Button type="submit" onClick={handleBid}>Submit</Button>
                </div>
            </form>
        </div>
    );
}