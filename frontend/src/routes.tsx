import { RouteObject } from "react-router-dom"
import App from "./App.tsx"

/*
Add routes to the RouteObject
 */

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />
    },
];