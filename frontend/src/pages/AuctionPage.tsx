import { useLocation } from "react-router-dom";
import { ImageInfo, ImageSlideshow } from "../components/Slideshow.tsx";
import { ItemOverview } from "../components/ItemOverview.tsx";
import { CurrentBid } from "../components/CurrentBid.tsx";

function AuctionPage() {
    const location = useLocation();
    const { auction } = location.state || {};

    if (!auction || !auction.artPiece) {
        return <div>Error: Auction data not found</div>;
    }

    return (
        <div>
            <div className="w-full p-10 pt-2">
                <hr className="pb-4"/>
                <div className="text-left ml-4">
                    <p className="text-2xl">{auction.artPiece.name} by {auction.artPiece.artistName}</p>
                </div>
                <div className="flex justify-between p-4 space-x-12">
                    <div className="flex-grow w-3/5">
                        <div>
                            <ImageSlideshow item={auction} />
                        </div>
                        <div className="pt-6">
                            <ItemOverview item={auction.artPiece} />
                        </div>
                    </div>
                    <div className="flex-grow-0 w-2/5">
                        <div>
                            <ImageInfo item={auction} />
                        </div>
                        <div className="grid justify-center pt-6">
                            <CurrentBid item={auction}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionPage;