import Login from "../components/Login.tsx";
import Register from "../components/register.tsx";

function LoginRegisterPage() {
    return (
        <div>
            <div className="w-full p-10 pt-2 flex-col">
                <Login />
                <Register />
            </div>
        </div>
    );
}

export default LoginRegisterPage;