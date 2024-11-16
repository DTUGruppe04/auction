export interface ObjectId {
    $oid: string;
}

export interface ArtPiece {
    _id: ObjectId,
    name: string,
    artistName: string,
    description: string,
    estimatedValue: string,
    ownerID: ObjectId,
    creationDate: string,
    pictureUrls: string[],
    auctionStart: string,
    auctionEnd: string,
    address: string
}