import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "../components/AuctionCard.tsx";

interface ArtPiece {
    name: string;
    artistName: string;
    description: string;
    estimatedValue: string;
    pictureUrl: string;
}

interface Auction {
    _id: string;
    auctionID: string;
    startDateTime: string;
    endDateTime: string;
    artPieceID: string;
    userID: string;
    artPiece?: ArtPiece;
    owner?: { name: string };
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
                    navigate('/');
                    return;
                }

                const response = await fetch("http://localhost:5050/auctions", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/');
                    } else if (response.status === 404) {
                        setError('Auctions not found.');
                    } else {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                } else {
                    const data: Auction[] = await response.json();

                    const auctionsWithDetails = await Promise.all(data.map(async (auction) => {
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

                            const ownerResponse = await fetch(`http://localhost:5050/auth/${auction.userID}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            if (!ownerResponse.ok) {
                                console.error(`Error fetching owner: ${ownerResponse.status} ${ownerResponse.statusText}`);
                                return auction; // Return auction without owner if there's an error
                            }

                            const owner = await ownerResponse.json();
                            const auctionID = auction._id ? auction._id.toString() : '';
                            return { ...auction, auctionID, artPiece, owner };
                        } catch (error) {
                            console.error("Error fetching auction details:", error);
                            return auction; // Return auction without details if there's an error
                        }
                    }));
                    setAuctions(auctionsWithDetails);
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

    //2k-height:pb-60 fixes the visual bug for the footer for larger screens
    return (
        <div>
            <div className="w-full p-10 pt-2 2k-height:pb-60">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {auctions.map((auction) => (
                        auction.artPiece && <AuctionCard key={auction.auctionID} auction={auction}/>
                    ))}
                </div>
            </div>
        </div>
    );
}