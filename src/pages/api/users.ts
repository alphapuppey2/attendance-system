import type { NextApiRequest,NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
// import UserModel from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if(req.method === "GET") {
    const data = await db.collection("users").find({}).toArray();
    res.status(200).json(data);
  }

  res.status(405).json({ message: "Method not allowed" });
}