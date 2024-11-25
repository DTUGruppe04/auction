import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoMemoryServer } from 'mongodb-memory-server';

let db;
let client;

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
    const uri = process.env.ATLAS_URI || "";
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
    db = client.db("employees");
} catch (err) {
    console.error(err);
}

export default db;