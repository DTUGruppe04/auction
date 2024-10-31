import Slideshow from "./components/Slideshow.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import FooterBottom from "./components/Footer.tsx";

const App = () => {
    return (
        <div className="w-full">
            <NavigationBar />
            {/*<Navbar />*/}
            {/*<Outlet />*/}
            <Slideshow />
            <FooterBottom />
        </div>
    );
};
export default App
