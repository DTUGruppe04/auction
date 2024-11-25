import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${'http://localhost:5050'}/auth/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
              });
            const data = await response.json();
            if (response.ok) {
                setUsernameError("");
                setPasswordError("");
                localStorage.setItem("token", data.token);
                navigate("/auctions");
            } else {
                if (data.error === "Invalid username") {
                    setUsernameError("Username doesn't match any");
                    setPasswordError("");
                } else if (data.error === "Invalid password") {
                    setPasswordError("Password is wrong");
                    setUsernameError("");
                } else {
                    setUsernameError(data.error);
                }
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setUsernameError("An error occurred during login");
        }
    };

    return (
        <div className="w-full flex-col justify-items-center">
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="username1" value="Username" />
                </div>
                <TextInput
                    id="username1"
                    type="text"
                    sizing="sm"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError("");
                    }}
                />
                {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>
            <div className="w-1/4">
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput
                    id="password1"
                    type="password"
                    required
                    shadow
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                    }}
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="mt-3">
                <Button onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}