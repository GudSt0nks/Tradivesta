import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

if (process.env.NODE_ENV === "development") {
  // Use global variable to preserve connection during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Use a new connection for production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;