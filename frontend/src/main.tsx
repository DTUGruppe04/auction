import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import "./index.css";
import LoginRegisterPage from "./pages/login_register.tsx";
import AuctionPage from "./pages/AuctionPage.tsx";
import AuctionListPage from "./pages/AuctionListPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAuctionPage from "./pages/createAuctionPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LoginRegisterPage />,
            },
            {
                path: "/auctionPage",
                element: (
                    <ProtectedRoute>
                        <AuctionPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/createAuctionPage",
                element: (
                    <ProtectedRoute>
                        <CreateAuctionPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/auctions",
                element: <AuctionListPage />,
            },
            {
                path: "/auction/:id",
                element: <AuctionPage />,
            },
        ],
    },
    {
        path: "/edit/:id",
        element: <App />,
        children: [
            {
                path: "/edit/:id",
                element: <Record />,
            },
        ],
    },
    {
        path: "/create",
        element: <App />,
        children: [
            {
                path: "/create",
                element: <Record />,
            },
        ],
    },
]);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);