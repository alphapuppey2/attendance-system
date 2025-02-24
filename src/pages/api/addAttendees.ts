import { NextApiRequest , NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import studentUser from "@/models/studentUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let resMessage = "";
    if(req.method !== "POST"){
        res.status(405).json({message: "Method not allowed"});
    }
    try{
        const { IDnumber } = req.body;
        if(!IDnumber){
            return res.status(400).json({message: "Please fill all fields"});
        }
        await connectToDatabase();

        const findAttendee = await studentUser.findOne({IDnumber});
        console.log(findAttendee);
        if(!findAttendee){
            console.log("not found");
            resMessage= "notFound";
            return res.status(404).json({message: "No Attendee Found"});
        }
        console.log("updating part ---");
        if(findAttendee.timeIn){
            findAttendee.timeOut = new Date();
            resMessage = "timeOut";
            await findAttendee.save();
        }else{
            findAttendee.timeIn = new Date();
            resMessage = "timeIn";
            await findAttendee.save();
        }

        console.log(findAttendee);
        res.status(200).json({message: resMessage , findAttendee});
    }catch(error){
        console.log(error);
        res.status(500).json({errMess: "Unable to Add Data", error: error});
    }
}