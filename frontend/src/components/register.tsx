import { useState } from "react";
import { Label, TextInput, Button, Select } from "flowbite-react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [country, setCountry] = useState("Danmark");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [errorMessage, seterrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleRegister = async () => {
        if (password !== repeatPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5050'}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, name, email, country, city, street }),
            });
            const data = await response.json();
            if (response.ok) {
                seterrorMessage("");
                setPasswordError("");
                alert("User registered successfully");
            } else {
                seterrorMessage(data.error);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            seterrorMessage("An error occurred during registration");
        }
    };

    return (
        <div className="w-full flex-col justify-items-center">
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="username2" value="Username" />
                </div>
                <TextInput
                    id="username2"
                    type="text"
                    sizing="sm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="name1" value="Name" />
                </div>
                <TextInput
                    id="name1"
                    type="text"
                    sizing="sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email" />
                </div>
                <TextInput
                    id="email1"
                    type="email"
                    placeholder="Your@email.com"
                    sizing="sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="password2" value="Password" />
                </div>
                <TextInput
                    id="password2"
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
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Repeat password" />
                </div>
                <TextInput
                    id="repeat-password"
                    type="password"
                    required
                    shadow
                    value={repeatPassword}
                    onChange={(e) => {
                        setRepeatPassword(e.target.value);
                        setPasswordError("");
                    }}
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="Select your country" />
                </div>
                <Select
                    id="countries"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option>Danmark</option>
                </Select>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="city1" value="City" />
                </div>
                <TextInput
                    id="city1"
                    type="text"
                    sizing="sm"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="street1" value="Street" />
                </div>
                <TextInput
                    id="street1"
                    type="text"
                    sizing="sm"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div className="mt-3">
                <Button onClick={handleRegister}>Register</Button>
            </div>
        </div>
    );
}