export interface Bids {
    bids: Bid[];
}


export interface Bid {
    amount: string;
    dateTime: string;
    auctionId: string;
    userID: string;
    _id: string;
}