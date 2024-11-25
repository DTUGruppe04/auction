import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../config.js';

let db
let client

console.log("ATLAS_URI: ", config.ATLAS_URI); // debug console log

if (process.env.NODE_ENV === 'test') {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
} else {
    const uri = config.ATLAS_URI || "";
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
}

try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
    );
} catch (err) {
    console.error(err);
}
db = client.db("employees");

export default db;