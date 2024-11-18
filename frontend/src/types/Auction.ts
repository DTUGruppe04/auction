
export interface Auction {
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
    owner: {
        name: string;
    };
}