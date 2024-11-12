import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import recordRouter from "./routes/record.js";
import auctionsRouter from "./routes/auctions.js";
import artpiecesRouter from "./routes/artpieces.js";
import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/authenticateToken.js"; // Import the middleware

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const secret = "team04"; // Use a secure secret in production

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the pictures directory with logging
app.use("/pictures", express.static(path.join(__dirname, "pictures")), (req, res, next) => {
    console.log(`Serving static file: ${req.url}`);
    next();
});

//can only access /record if authenticated can be used when want to restrict access to certain routes
app.use("/auth", authenticateToken, authRouter);
app.use("/record", authenticateToken, recordRouter);
app.use("/auctions", authenticateToken, auctionsRouter);
app.use("/artpieces", authenticateToken, artpiecesRouter);

app.get("/pictures", (req, res) => {
    const picturesDir = path.join(__dirname, "pictures");
    console.log("Attempting to read files from:", picturesDir); // Debug line

    fs.readdir(picturesDir, (err, files) => {
        if (err) {
            console.error("Error reading pictures directory:", err); // Debug line
            return res.status(500).send("Unable to scan directory");
        }
        console.log("Files found in pictures directory:", files); // Debug line

        // Construct the URLs
        const pictureUrls = files.map(file => `http://localhost:5050/pictures/${file}`);
        res.send(pictureUrls);
    });
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});