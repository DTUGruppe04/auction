import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import AuctionCard from "../components/AuctionCard.tsx";
import NavigationBar from "../components/NavigationBar.tsx";
import { FooterBottom } from "../components/Footer.tsx";
import {Button} from "flowbite-react";

interface ArtPiece {
    name: string;
    artistName: string;
    description: string;
    estimatedValue: string;
    pictureUrl: string;
}

interface Auction {
    auctionID: string;
    startDateTime: string;
    endDateTime: string;
    artPieceID: string;
    artPiece?: ArtPiece;
}

export default function AuctionListPage() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch("http://localhost:5050/auctions", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login');
                    } else if (response.status === 404) {
                        setError('Auctions not found.');
                    } else {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                } else {
                    const data: Auction[] = await response.json();
                    const auctionsWithArtPieces = await Promise.all(data.map(async (auction) => {
                        try {
                            const artPieceResponse = await fetch(`http://localhost:5050/artpieces/${auction.artPieceID}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            if (!artPieceResponse.ok) {
                                console.error(`Error fetching art piece: ${artPieceResponse.status} ${artPieceResponse.statusText}`);
                                return auction; // Return auction without artPiece if there's an error
                            }

                            const artPiece = await artPieceResponse.json();
                            return { ...auction, artPiece };
                        } catch (error) {
                            console.error("Error fetching art piece:", error);
                            return auction; // Return auction without artPiece if there's an error
                        }
                    }));
                    setAuctions(auctionsWithArtPieces);
                }
            } catch (error) {
                setError((error as Error).message);
                console.error("Error fetching auctions:", error);
            }
        };

        fetchAuctions();
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavigationBar />
            <Link to="/createAuctionPage" >
                <Button className="ml-4">Create new auction</Button>
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {auctions.map((auction) => (
                    auction.artPiece && <AuctionCard key={auction.auctionID} auction={auction} />
                ))}
            </div>
            <FooterBottom />
        </div>
    );
}