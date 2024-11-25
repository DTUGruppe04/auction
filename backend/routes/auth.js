import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/connection.js";
import {ObjectId} from "mongodb";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();
import config from '../config.js'

//const config = require('../config.js');
const secret = config.JWT_SECRET_KEY;

console.log("Auth Secrets:" + secret);

// Function to validate address (this is a placeholder, implement actual validation logic)
function isValidAddress(address) {
    // Add address validation logic here
    return address.country && address.city && address.street;
}

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { username, password, name, email, country, city, street } = req.body;

        // Check if the username already exists
        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already in use" });
        }

        // Validate address
        const address = { country, city, street };
        if (!isValidAddress(address)) {
            return res.status(400).json({ error: "Invalid address" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = { username, password: hashedPassword, name, email };

        // Insert the new user into the 'users' collection
        const userCollection = await db.collection("users");
        const userResult = await userCollection.insertOne(newUser);

        // Insert the address into the 'addresses' collection with a reference to the user
        const addressCollection = await db.collection("addresses");
        const newAddress = { ...address, userId: userResult.insertedId };
        const addressResult = await addressCollection.insertOne(newAddress);

        // Update the user with the address ID
        await userCollection.updateOne(
            { _id: userResult.insertedId },
            { $set: { addressId: addressResult.insertedId } }
        );

        // Send a success response
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login a user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const collection = await db.collection("users");
        const user = await collection.findOne({ username });
        if (!user) return res.status(400).json({ error: "Invalid username" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        // Create a JWT token with the user id and the secret, expiration time is 1 hour
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error logging in" });
    }
});

// Get user information by ID
router.get("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching user with ID: ${id}`); // Log the user ID

    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
        console.log(`User found: ${JSON.stringify(user)}`); // Log the user data
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(`Error fetching user information: ${err}`); // Log the error
        res.status(500).json({ error: "Error fetching user information" });
    }
});
export default router;