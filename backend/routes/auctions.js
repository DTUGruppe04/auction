// backend/routes/auctions.js
import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    console.log('GET /auctions endpoint hit'); // Add this line for logging
    try {
        const auctions = await db.collection('auctions').find().toArray();
        res.status(200).json(auctions);
    } catch (error) {
        console.error('Error fetching auctions:', error);
        res.status(500).json({ error: 'Failed to fetch auctions' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { startDateTime, endDateTime, artPieceID } = req.body;
    const userID = new ObjectId(req.user.id);

    try {
        const auction = { startDateTime, endDateTime, artPieceID: new ObjectId(artPieceID), userID };
        const result = await db.collection('auctions').insertOne(auction);
        res.status(201).json({ auctionID: result.insertedId });
    } catch (error) {
        console.error('Error creating auction:', error);
        res.status(500).json({ error: 'Failed to create auction' });
    }
});

export default router;