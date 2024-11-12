import NavigationBar from "../components/NavigationBar.tsx";
import {FooterBottom} from "../components/Footer.tsx";
import NewAuctionForm from "../components/makeAuction.tsx";

function CreateAuctionPage() {
    return (
        <div>
            <NavigationBar/>
            <NewAuctionForm />
            <FooterBottom />
        </div>
    );
}

export default CreateAuctionPage;