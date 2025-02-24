import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import studentUser from "@/models/studentUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    if(req.method !== "DELETE"){
        res.status(405).json({message: "Method not allowed"});
    }
    try{
        await connectToDatabase();

        const attendee = await studentUser.deleteMany({});

        res.status(200).json({message: "Sending Data to Client" , attendee});
    }catch(error){
        console.log(error);
        res.status(500).json({errMess: "Unable to Add Data", error: error});
    }
}