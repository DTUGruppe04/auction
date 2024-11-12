import { useState, useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function NewAuctionForm() {
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [artPieceName, setArtPieceName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedValue, setEstimatedValue] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [pictures, setPictures] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                const response = await fetch("http://localhost:5050/pictures");
                const data = await response.json();
                setPictures(data);
                console.log("Fetched pictures:", data);
            } catch (error) {
                console.error("Error fetching pictures:", error);
            }
        };

        fetchPictures();
    }, []);

    const handleCreateAuction = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("User is not logged in");
            return;
        }

        const decodedToken = jwtDecode(token);
        const userID = decodedToken.userID;

        try {
            const artPieceResponse = await fetch("http://localhost:5050/artpieces", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: artPieceName, artistName, description, estimatedValue }),
            });
            const artPieceData = await artPieceResponse.json();

            if (!artPieceResponse.ok) {
                console.error("Failed to create art piece");
                return;
            }

            const auctionResponse = await fetch("http://localhost:5050/auctions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ startDateTime, endDateTime, artPieceID: artPieceData.artPieceID, userID, pictureUrl }),
            });

            if (auctionResponse.ok) {
                navigate("/auctionpage");
            } else {
                console.error("Failed to create auction");
            }
        } catch (error) {
            console.error("Error creating auction:", error);
        }
    };

    return (
        <div className="w-full flex-col justify-items-center">
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="startDateTime" value="Start Date and Time" />
                </div>
                <TextInput
                    id="startDateTime"
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="endDateTime" value="End Date and Time" />
                </div>
                <TextInput
                    id="endDateTime"
                    type="datetime-local"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="artPieceName" value="Art Piece Name" />
                </div>
                <TextInput
                    id="artPieceName"
                    type="text"
                    value={artPieceName}
                    onChange={(e) => setArtPieceName(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="artistName" value="Artist Name" />
                </div>
                <TextInput
                    id="artistName"
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="estimatedValue" value="Estimated Value" />
                </div>
                <TextInput
                    id="estimatedValue"
                    type="number"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                />
            </div>
            <div className="w-1/4 mb-3">
                <div className="mb-2 block">
                    <Label htmlFor="pictureUrl" value="Picture" />
                </div>
                <div className="flex flex-wrap">
                    {pictures.map((picture, index) => (
                        <img
                            key={index}
                            src={picture}
                            alt={`Thumbnail ${index}`}
                            className={`w-24 h-24 object-cover m-1 cursor-pointer rounded ${pictureUrl === picture ? 'ring-4 ring-blue-500' : ''}`}
                            onClick={() => setPictureUrl(picture)}
                            onError={(e) => {
                                console.error("Error loading image:", e);
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-3">
                <Button onClick={handleCreateAuction}>Create Auction</Button>
            </div>
        </div>
    );
}