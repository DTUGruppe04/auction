import {Outlet} from "react-router-dom";
import NavigationBar from "./components/NavigationBar.tsx";
import {FooterBottom} from "./components/Footer.tsx";

const App = () => {
    return (
        <>
            <NavigationBar />
            <Outlet/>
            <FooterBottom />
        </>
    );
};
export default App
