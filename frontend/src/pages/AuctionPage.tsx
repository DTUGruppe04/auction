import {ImageInfo, ImageSlideshow} from "../components/Slideshow.tsx";
import {ItemOverview} from "../components/ItemOverview.tsx";
import {CurrentBid} from "../components/CurrentBid.tsx";
import NavigationBar from "../components/NavigationBar.tsx";

function AuctionPage() {
    return (
        <div className="w-full p-6">
            <NavigationBar />
            <div className="flex justify-between p-4 bg-gray-100 space-x-4">
                <div className="flex-grow w-3/5">
                    <ImageSlideshow />
                    <ItemOverview />
                </div>
                <div className="flex-grow-0 w-2/5">
                    <ImageInfo />
                    <div className="grid justify-center">
                        <CurrentBid />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionPage;