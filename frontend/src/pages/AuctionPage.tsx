import {ImageInfo, ImageSlideshow} from "../components/Slideshow.tsx";
import {ItemOverview} from "../components/ItemOverview.tsx";
import {CurrentBid} from "../components/CurrentBid.tsx";
import artpiece from "../../artpiece.json";

function AuctionPage() {
    return (
        <div>
            <div className="w-full p-10 pt-2">
                <hr className="pb-4"/>
                <div className="text-left ml-4">
                    <p className="text-2xl">{artpiece.name} by {artpiece.artistName}</p>
                </div>
                <div className="flex justify-between p-4 space-x-12">
                    <div className="flex-grow w-3/5">
                        <div>
                            <ImageSlideshow item={artpiece} />
                        </div>
                        <div className="pt-6">
                            <ItemOverview item={artpiece} />
                        </div>
                    </div>
                    <div className="flex-grow-0 w-2/5">
                        <div>
                            <ImageInfo item={artpiece}/>
                        </div>
                        <div className="grid justify-center pt-6">
                            <CurrentBid/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionPage;