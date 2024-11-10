import { Label, TextInput, Button } from "flowbite-react";

export default function Login() {
    return (
        <div className="w-full flex-col justify-items-center">
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="username1" value="Username"/>
                </div>
                <TextInput id="username1" type="text" sizing="sm"/>
            </div>
            <div className="w-1/4">
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password"/>
                </div>
                <TextInput id="password1" type="password" required shadow/>
            </div>
            <div className="mt-3">
                <Button>Login</Button>
            </div>
        </div>
    );
}