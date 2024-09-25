import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI!;
const option = {};
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Thêm biến MONGODB_URI trong tệp .env");
}

if (process.env.NODE_ENV === "development") {
  const globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri, option);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect().catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  });
}

export default clientPromise;
