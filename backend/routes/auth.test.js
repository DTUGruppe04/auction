import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRoutes from './auth';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Authentication Routes', () => {

	it('should register a user successfully', async () => {
		const response = await request(app)
			.post('/auth/register')
			.send({
				username: 'testuser',
				password: 'password123',
				name: 'Test User',
				email: 'testuser@example.com',
				country: 'Test Country',
				city: 'Test City',
				street: 'Test Street'
			});
		expect(response.status).toBe(201);
		expect(response.body.message).toBe('User registered');
	});

	it('should fail to register a user with an existing username', async () => {
		await request(app)
			.post('/auth/register')
			.send({
				username: 'testuser',
				password: 'password123',
				name: 'Test User',
				email: 'testuser@example.com',
				country: 'Test Country',
				city: 'Test City',
				street: 'Test Street'
			});

		const response = await request(app)
			.post('/auth/register')
			.send({
				username: 'testuser',
				password: 'password123',
				name: 'Another User',
				email: 'anotheruser@example.com',
				country: 'Another Country',
				city: 'Another City',
				street: 'Another Street'
			});
		expect(response.status).toBe(400);
		expect(response.body.error).toBe('Username already in use');
	});

	it('should login a user successfully', async () => {
		await request(app)
			.post('/auth/register')
			.send({
				username: 'testuser',
				password: 'password123',
				name: 'Test User',
				email: 'testuser@example.com',
				country: 'Test Country',
				city: 'Test City',
				street: 'Test Street'
			});

		const response = await request(app)
			.post('/auth/login')
			.send({
				username: 'testuser',
				password: 'password123'
			});
		expect(response.status).toBe(200);
		expect(response.body.token).toBeDefined();
	});

	it('should fail to login with incorrect credentials', async () => {
		await request(app)
			.post('/auth/register')
			.send({
				username: 'testuser',
				password: 'password123',
				name: 'Test User',
				email: 'testuser@example.com',
				country: 'Test Country',
				city: 'Test City',
				street: 'Test Street'
			});

		const response = await request(app)
			.post('/auth/login')
			.send({
				username: 'testuser',
				password: 'wrongpassword'
			});
		expect(response.status).toBe(400);
		expect(response.body.error).toBe('Invalid password');
	});
});