import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

interface AuctionCardProps {
    auction: {
        auctionID: string;
        startDateTime: string;
        endDateTime: string;
        artPiece: {
            name: string;
            artistName: string;
            description: string;
            estimatedValue: string;
            pictureUrl: string;
        };
    };
}

export default function AuctionCard({ auction }: AuctionCardProps) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/auction/${auction.auctionID}`);
    };

    if (!auction || !auction.artPiece) {
        console.error("Invalid auction data:", auction);
        return <div>Invalid auction data</div>;
    }

    if (!auction.artPiece.pictureUrl) {
        console.error("Invalid artPiece data:", auction.artPiece);
        return <div>Invalid artPiece data</div>;
    }

    return (
        <Card onClick={handleCardClick} className="cursor-pointer">
            <img src={auction.artPiece.pictureUrl} alt={auction.artPiece.name} className="w-full h-48 object-contain" />
            <h5 className="text-xl font-bold">Name of artpiece: {auction.artPiece.name}</h5>
            <p className="text-sm text-gray-500">By {auction.artPiece.artistName}</p>
            <p className="text-sm line-clamp-3">{auction.artPiece.description}</p>
            <p className="text-sm font-bold">Estimated Value: {auction.artPiece.estimatedValue} DKK</p>
            <p className="text-sm">Start: {new Date(auction.startDateTime).toLocaleString()}</p>
            <p className="text-sm">End: {new Date(auction.endDateTime).toLocaleString()}</p>
        </Card>
    );
}