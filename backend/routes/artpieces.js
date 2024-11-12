// backend/routes/artpieces.js
import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const { name, artistName, description, estimatedValue, pictureUrl, creationDate } = req.body;
    const ownerID = new ObjectId(req.user.id);

    try {
        const artPiece = { name, artistName, description, estimatedValue, ownerID, creationDate, pictureUrl };
        const result = await db.collection('artpieces').insertOne(artPiece);
        res.status(201).json({ artPieceID: result.insertedId });
    } catch (error) {
        console.error('Error creating art piece:', error);
        res.status(500).json({ error: 'Failed to create art piece' });
    }
});

export default router;