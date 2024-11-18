export interface ObjectId {
    $oid: string;
}

export interface ArtPiece {
    _id: ObjectId;
    name: string;
    artistName: string;
    description: string;
    estimatedValue: string;
    pictureUrl: string;
}