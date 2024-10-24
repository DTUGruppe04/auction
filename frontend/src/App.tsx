import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Carousel.tsx";

const App = () => {
    return (
        <div className="w-full p-6">
            <Navbar />
            <Outlet />
            <Slideshow />
        </div>
    );
};
export default App
