// backend/routes/bid.js

import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js'
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

//https://localhost:5050/bid/

//POST a bid to the database
router.post('/', authenticateToken, async (req, res) => {
    console.log('POST /bid endpoint hit');
    const { amount, dateTime, auctionID } = req.body;
    const userID = new ObjectId(req.user.id);

    try {
        const bid = { userID, amount, dateTime, auctionID};
        const result = await db.collection('bid').insertOne(bid)
        const bidID = result.insertedId;

        // Insert new bidID to Auction
        await db.collection('auctions').updateOne(
            { _id: new ObjectId(auctionID) },
            { $push: { bids: bidID } }
        );

        res.status(201);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to create bid' });
    }
});

export default router;
