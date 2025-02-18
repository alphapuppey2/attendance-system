import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not set");
}

// Declare a global type for caching
interface MongooseGlobal {
  mongoose?: { con: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// Use `globalThis` to access global scope in a type-safe way
const globalWithMongoose = globalThis as unknown as MongooseGlobal;

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { con: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

export async function connectToDatabase() {
    if (cached.con) {
        console.log("🔄 Using cached MongoDB connection");
        return cached.con;
    }

    if (!cached.promise) {
        console.log("⏳ Connecting to MongoDB...");
        const opts = { bufferCommands: false };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
            console.log("✅ Connected to MongoDB");
            return mongooseInstance.connection;
        }).catch((err) => {
            console.error("❌ MongoDB connection error:", err);
            throw err;
        });
    }

    cached.con = await cached.promise;
    return cached.con;
}
