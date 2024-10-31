import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import {ItemOverview} from "./components/ItemOverview.tsx";
import {CurrentBid} from "./components/CurrentBid.tsx";

const App = () => {
    return (
        <div className="w-full p-6">
            <NavigationBar />
            {/*<Navbar />*/}
            {/*<Outlet />*/}
            <Slideshow />
            <ItemOverview />
            <CurrentBid />
        </div>
    );
};
export default App
