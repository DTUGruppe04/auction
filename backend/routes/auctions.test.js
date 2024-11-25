import express from 'express';
import request from 'supertest';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import auctionsRouter from './auctions.js';
import db from '../db/connection.js';

process.env.NODE_ENV = 'test';

const app = express();
app.use(express.json());
app.use('/auctions', auctionsRouter);

vi.mock('../middleware/authenticateToken.js', () => ({
    default: vi.fn((req, res, next) => {
        req.user = { id: '507f1f77bcf86cd799439011' }; // Mock user object
        next();
    })
}));

vi.mock('../db/connection.js', () => ({
    default: {
        collection: vi.fn().mockReturnValue({
            insertOne: vi.fn().mockResolvedValue({ insertedId: '507f1f77bcf86cd799439011' })
        })
    }
}));

describe('Auctions API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        db.collection.mockReturnValue({
            find: vi.fn().mockReturnValue({
                toArray: vi.fn()
            }),
            insertOne: vi.fn().mockResolvedValue({ insertedId: '507f1f77bcf86cd799439011' })
        });
    });

    describe('GET /auctions', () => {
        it('should fetch all auctions', async () => {
            const mockAuctions = [{ _id: '1', name: 'Auction 1' }, { _id: '2', name: 'Auction 2' }];
            db.collection.mockReturnValue({
                find: vi.fn().mockReturnValue({
                    toArray: vi.fn().mockResolvedValue(mockAuctions)
                })
            });

            const response = await request(app).get('/auctions');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockAuctions);
        });

        it('should handle errors when fetching auctions', async () => {
            db.collection.mockReturnValue({
                find: vi.fn().mockReturnValue({
                    toArray: vi.fn().mockRejectedValue(new Error('Failed to fetch auctions'))
                })
            });

            const response = await request(app).get('/auctions');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch auctions' });
        });
    });

    describe('POST /auctions', () => {
        it('should create a new auction', async () => {
            const newAuction = { startDateTime: '2023-10-01T00:00:00Z', endDateTime: '2023-10-02T00:00:00Z', artPieceID: '507f1f77bcf86cd799439011' };
            const mockInsertedId = '507f1f77bcf86cd799439011';
            db.collection.mockReturnValue({
                insertOne: vi.fn().mockResolvedValue({ insertedId: mockInsertedId })
            });

            const response = await request(app).post('/auctions').send(newAuction);

            console.log(response.body);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ auctionID: mockInsertedId });
        });

        it('should handle errors when creating a new auction', async () => {
            const newAuction = { startDateTime: '2023-10-01T00:00:00Z', endDateTime: '2023-10-02T00:00:00Z', artPieceID: '123' };
            db.collection.mockReturnValue({
                insertOne: vi.fn().mockRejectedValue(new Error('Failed to create auction'))
            });

            const response = await request(app).post('/auctions').send(newAuction);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create auction' });
        });
    });
});