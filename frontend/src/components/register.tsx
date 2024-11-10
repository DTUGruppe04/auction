import {Label, TextInput, Button, Select} from "flowbite-react";

export default function Register() {
    return (
        <div className="w-full flex-col justify-items-center">
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="username2" value="Username"/>
                </div>
                <TextInput id="username2" type="text" sizing="sm"/>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="name1" value="Name"/>
                </div>
                <TextInput id="name1" type="text" sizing="sm"/>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email"/>
                </div>
                <TextInput id="email1" type="email" placeholder="Your@email.com" sizing="sm"/>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="password2" value="Password"/>
                </div>
                <TextInput id="password2" type="password" required shadow/>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="repeat-password" value="Repeat password"/>
                </div>
                <TextInput id="repeat-password" type="password" required shadow/>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="countries" value="Select your country"/>
                </div>
                <Select id="countries" required>
                    <option>Danmark</option>
                </Select>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="city1" value="City"/>
                </div>
                <TextInput id="city1" type="text" sizing="sm"/>
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                <Label htmlFor="street1" value="Street"/>
                </div>
                <TextInput id="street1" type="text" sizing="sm"/>
            </div>
            <div className="mt-3">
                <Button>Register</Button>
            </div>
        </div>
    );
}