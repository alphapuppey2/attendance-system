import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import studentUser from "@/models/studentUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   if(req.method !== "POST"){
    res.status(405).json({ message: "Method not allowed" });
   }

   try {
    await connectToDatabase();
    
    const studentData = new studentUser({...req.body});
    
    await studentData.save();
    console.log(studentData);

    res.status(200).json(studentData);

   }catch(error){
    res.status(500).json({errMess:"Unable to Add Data", error : error});
   };
};
