// WIP. Still need to setup database, database connection and the backend server part. Ignore this code for now.

import express from 'express';
import cors from "cors";
//import records from "./records.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
//app.use("/record", records)

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});