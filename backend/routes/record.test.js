import express from 'express';
import request from 'supertest';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import recordRouter from './record.js';
import db from '../db/connection.js';

const app = express();
app.use(express.json());
app.use('/record', recordRouter);

vi.mock('../db/connection.js', () => ({
    default: {
        collection: vi.fn().mockReturnValue({
            find: vi.fn().mockReturnThis(),
            toArray: vi.fn(),
            findOne: vi.fn(),
            insertOne: vi.fn(),
            updateOne: vi.fn(),
            deleteOne: vi.fn()
        })
    }
}));

describe('Record API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GET /record', () => {
        it('should get a list of all records', async () => {
            const mockRecords = [{ name: 'Record1' }, { name: 'Record2' }];
            db.collection().toArray.mockResolvedValue(mockRecords);

            const response = await request(app).get('/record');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRecords);
        });
    });

    describe('GET /record/:id', () => {
        it('should get a single record by id', async () => {
            const mockRecord = { _id: '507f1f77bcf86cd799439011', name: 'Record1' };
            db.collection().findOne.mockResolvedValue(mockRecord);

            const response = await request(app).get('/record/507f1f77bcf86cd799439011');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRecord);
        });

        it('should return 404 if record not found', async () => {
            db.collection().findOne.mockResolvedValue(null);

            const response = await request(app).get('/record/507f1f77bcf86cd799439010');

            expect(response.status).toBe(404);
            expect(response.text).toBe('Not found');
        });

        it('should return 400 for invalid ObjectId', async () => {
            const invalidId = "12345";
            const response = await request(app).get(`/record/${invalidId}`);
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid ObjectId");
        });
    });

    describe('POST /record', () => {
        it('should create a new record', async () => {
            const newRecord = { name: 'Record1', position: 'Position1', level: 'Level1' };
            db.collection().insertOne.mockResolvedValue({ insertedId: '507f1f77bcf86cd799439011' });

            const response = await request(app).post('/record').send(newRecord);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ insertedId: '507f1f77bcf86cd799439011' });
        });

        it('should handle errors when creating a new record', async () => {
            db.collection().insertOne.mockRejectedValue(new Error('Failed to create record'));

            const newRecord = { name: 'Record1', position: 'Position1', level: 'Level1' };

            const response = await request(app).post('/record').send(newRecord);

            expect(response.status).toBe(500);
            expect(response.text).toBe('Error adding record');
        });
    });

    describe('PATCH /record/:id', () => {
        it('should update a record by id', async () => {
            const updates = { name: 'Updated Record', position: 'Updated Position', level: 'Updated Level' };
            db.collection().updateOne.mockResolvedValue({ modifiedCount: 1 });

            const response = await request(app).patch('/record/507f1f77bcf86cd799439011').send(updates);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ modifiedCount: 1 });
        });

        it('should handle errors when updating a record', async () => {
            db.collection().updateOne.mockRejectedValue(new Error('Failed to update record'));

            const updates = { name: 'Updated Record', position: 'Updated Position', level: 'Updated Level' };

            const response = await request(app).patch('/record/507f1f77bcf86cd799439011').send(updates);

            expect(response.status).toBe(500);
            expect(response.text).toBe('Error updating record');
        });
    });

    describe('DELETE /record/:id', () => {
        it('should delete a record by id', async () => {
            db.collection().deleteOne.mockResolvedValue({ deletedCount: 1 });

            const response = await request(app).delete('/record/507f1f77bcf86cd799439011');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ deletedCount: 1 });
        });

        it('should handle errors when deleting a record', async () => {
            db.collection().deleteOne.mockRejectedValue(new Error('Failed to delete record'));

            const response = await request(app).delete('/record/507f1f77bcf86cd799439011');

            expect(response.status).toBe(500);
            expect(response.text).toBe('Error deleting record');
        });
    });
});