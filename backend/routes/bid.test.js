import express from 'express';
import request from 'supertest';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import bidRouter from './bid.js';
import db from '../db/connection.js';

const app = express();
app.use(express.json());
app.use('/bid', bidRouter);

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
            find: vi.fn().mockReturnValue({
                toArray: vi.fn().mockResolvedValue([{ _id: '507f1f77bcf86cd799439011', amount: 100 }])
            }),
            updateOne: vi.fn().mockResolvedValue({ modifiedCount: 1 })
        })
    }
}));

describe('Bid API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        db.collection.mockReturnValue({
            insertOne: vi.fn().mockResolvedValue({ insertedId: '507f1f77bcf86cd799439011' }),
            find: vi.fn().mockReturnValue({
                toArray: vi.fn().mockResolvedValue([{ _id: '507f1f77bcf86cd799439011', amount: 100 }])
            }),
            updateOne: vi.fn().mockResolvedValue({ modifiedCount: 1 })
        });
    });

    describe('POST /bid', () => {
        it('should create a new bid', async () => {
            const newBid = {
                amount: 100,
                dateTime: new Date(),
                auctionID: '507f1f77bcf86cd799439011'
            };
            console.log('newBid:', newBid);
            const response = await request(app)
                .post('/bid')
                .send(newBid);
            console.log(response.body);
            expect(response.status).toBe(201);
        });

        it('should return 500 if bid creation fails', async () => {
            db.collection.mockReturnValue({
                insertOne: vi.fn().mockRejectedValue(new Error('Failed to create bid'))
            });

            const newBid = {
                amount: 100,
                dateTime: new Date(),
                auctionID: '507f1f77bcf86cd799439011'
            };

            const response = await request(app)
                .post('/bid')
                .send(newBid);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to create bid');
        });
    });

    describe('GET /bid/:id', () => {
        it('should get all bids for a given auctionID', async () => {
            const auctionID = '507f1f77bcf86cd799439011';

            const response = await request(app)
                .get(`/bid/${auctionID}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ _id: '507f1f77bcf86cd799439011', amount: 100 }]);
        });

        it('should return 404 if no bids are found', async () => {
            db.collection.mockReturnValue({
                find: vi.fn().mockReturnValue({
                    toArray: vi.fn().mockResolvedValue([])
                })
            });

            const auctionID = '507f1f77bcf86cd799439011';

            const response = await request(app)
                .get(`/bid/${auctionID}`);

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('auctionBids not found');
        });
    });
});