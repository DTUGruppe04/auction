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
        const bid = { userID, amount, dateTime, auctionID: new ObjectId(auctionID)};
        const result = await db.collection('bid').insertOne(bid)
        const bidID = result.insertedId;

        // Insert new bidID to Auction
        await db.collection('auctions').updateOne(
            { _id: new ObjectId(auctionID) },
            { $push: { bids: bidID } }
        );

        res.status(201).json({ bidID });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Failed to create bid' });
    }
});

//GET all bids with a auctionID
router.get('/:id', authenticateToken, async (req, res) => {
   console.log('GET /bid endpoint hit 2');

   const { id } = req.params;
   console.log("ID:" + id)

   try {
       const auctionBids = await db.collection('bid').find({auctionID: new ObjectId(id)}).toArray();
       if (auctionBids.length === 0) {
           return res.status(404).json({ error: 'auctionBids not found' });
       }
       res.status(200).json(auctionBids);
   } catch (e) {
       console.log(e);
       res.status(404).json({ error: 'Failed to fetch bid' });
   }
});


export default router;
