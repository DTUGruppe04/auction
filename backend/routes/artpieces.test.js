import express from 'express';
import request from 'supertest';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import artpiecesRouter from './artpieces.js';
import db from '../db/connection.js';

const app = express();
app.use(express.json());
app.use('/artpieces', artpiecesRouter);

vi.mock('../middleware/authenticateToken.js', () => ({
    default: vi.fn((req, res, next) => {
        req.user = { id: '507f1f77bcf86cd799439011' }; // Mock user object
        next();
    })
}));

vi.mock('../db/connection.js', () => ({
    default: {
        collection: vi.fn().mockReturnValue({
            insertOne: vi.fn().mockResolvedValue({ insertedId: '507f1f77bcf86cd799439011' }),
            findOne: vi.fn()
        })
    }
}));

describe('Artpieces API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        db.collection.mockReturnValue({
            insertOne: vi.fn().mockResolvedValue({ insertedId: '507f1f77bcf86cd799439011' }),
            findOne: vi.fn()
        });
    });

    describe('POST /artpieces', () => {
        it('should create a new art piece', async () => {
            const newArtPiece = {
                name: 'Mona Lisa',
                artistName: 'Leonardo da Vinci',
                description: 'A portrait painting',
                estimatedValue: 1000000,
                pictureUrl: 'http://example.com/monalisa.jpg',
                creationDate: '1503-10-01'
            };

            const response = await request(app).post('/artpieces').send(newArtPiece);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ artPieceID: '507f1f77bcf86cd799439011' });
        });

        it('should handle errors when creating a new art piece', async () => {
            db.collection.mockReturnValue({
                insertOne: vi.fn().mockRejectedValue(new Error('Failed to create art piece'))
            });

            const newArtPiece = {
                name: 'Mona Lisa',
                artistName: 'Leonardo da Vinci',
                description: 'A portrait painting',
                estimatedValue: 1000000,
                pictureUrl: 'http://example.com/monalisa.jpg',
                creationDate: '1503-10-01'
            };

            const response = await request(app).post('/artpieces').send(newArtPiece);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create art piece' });
        });
    });

    describe('GET /artpieces/:id', () => {
        it('should fetch an art piece by ID', async () => {
            const mockArtPiece = {
                _id: '507f1f77bcf86cd799439011',
                name: 'Mona Lisa',
                artistName: 'Leonardo da Vinci',
                description: 'A portrait painting',
                estimatedValue: 1000000,
                pictureUrl: 'http://example.com/monalisa.jpg',
                creationDate: '1503-10-01',
                ownerID: '507f1f77bcf86cd799439011'
            };

            db.collection.mockReturnValue({
                findOne: vi.fn().mockResolvedValue(mockArtPiece)
            });

            const response = await request(app).get('/artpieces/507f1f77bcf86cd799439011');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockArtPiece);
        });

        it('should return 404 if art piece not found', async () => {
            db.collection.mockReturnValue({
                findOne: vi.fn().mockResolvedValue(null)
            });

            const response = await request(app).get('/artpieces/507f1f77bcf86cd799439011');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Art piece not found' });
        });

        it('should handle errors when fetching an art piece', async () => {
            db.collection.mockReturnValue({
                findOne: vi.fn().mockRejectedValue(new Error('Failed to fetch art piece'))
            });

            const response = await request(app).get('/artpieces/507f1f77bcf86cd799439011');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch art piece' });
        });
    });
});