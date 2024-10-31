import {ImageInfo, ImageSlideshow} from "../components/Slideshow.tsx";
import {ItemOverview} from "../components/ItemOverview.tsx";
import {CurrentBid} from "../components/CurrentBid.tsx";
import NavigationBar from "../components/NavigationBar.tsx";
import {FooterBottom} from "../components/Footer.tsx";

function AuctionPage() {
    return (
        <div>
            <div className="w-full p-10 pt-2">
                <NavigationBar />
                <div className="flex justify-between p-4 space-x-12">
                    <div className="flex-grow w-3/5">
                        <div>
                            <ImageSlideshow />
                        </div>
                        <div className="pt-6">
                            <ItemOverview />
                        </div>
                    </div>
                    <div className="flex-grow-0 w-2/5">
                        <div>
                            <ImageInfo />
                        </div>
                        <div className="grid justify-center pt-6">
                            <CurrentBid />
                        </div>
                    </div>
                </div>
            </div>
            <FooterBottom />
        </div>
    );
}

export default AuctionPage;