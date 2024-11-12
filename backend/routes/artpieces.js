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

// Add GET endpoint to fetch art piece by ID
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const artPiece = await db.collection('artpieces').findOne({ _id: new ObjectId(id) });
        if (!artPiece) {
            return res.status(404).json({ error: 'Art piece not found' });
        }
        res.status(200).json(artPiece);
    } catch (error) {
        console.error('Error fetching art piece:', error);
        res.status(500).json({ error: 'Failed to fetch art piece' });
    }
});

export default router;