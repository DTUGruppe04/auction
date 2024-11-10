import NavigationBar from "../components/NavigationBar.tsx";
import {FooterBottom} from "../components/Footer.tsx";
import Login from "../components/Login.tsx";
import Register from "../components/register.tsx";

function LoginRegisterPage() {
    return (
        <div>
            <NavigationBar/>
            <div className="w-full p-10 pt-2 flex-col">
                <Login />
                <Register />
            </div>
            <FooterBottom />
        </div>
    );
}

export default LoginRegisterPage;