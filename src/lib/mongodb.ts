import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not set");
}

let cached = (global as any).mongoose || {con: null , promise:null};

export async function connectToDatabase() {
    if(cached.con) {
        console.log("🔄 Using cached MongoDB connection");
        return cached.con;
    }
    if(!cached.promise) {
        console.log("⏳ Connecting to MongoDB...");
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        
        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log("Connected to MongoDB");
            return mongoose;
        })
        .catch((err) => {
            console.log(err);
        });
    }
    cached.con = await cached.promise;
    return cached.con;
}