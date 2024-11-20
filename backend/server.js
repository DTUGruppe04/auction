import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import recordRouter from "./routes/record.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const config = require('./config');

const secret = config.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/auth", authRouter);
//can only access /record if authenticated can be used when want to restrict access to certain routes
app.use("/record", authenticateToken, recordRouter);

const port = config.PORT || 5050;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});