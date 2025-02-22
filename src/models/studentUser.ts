import mongoose , {Schema, Document, Model} from "mongoose";

interface IStudentUser extends Document {
    IDnumber: string;
    name: string;
    course: string;
    yearLevel: number;
    timeIn: Date; 
    timeOut: Date;

    
}
const StudentUserSchema = new Schema<IStudentUser>({
    IDnumber: { type: String, required: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    yearLevel: { type: Number, required: true },
    timeIn: { type: Date, required: true ,default: null },
    timeOut: { type: Date, required: true,default: null },
});


const studentUser: Model<IStudentUser> = mongoose.models.studentUser || mongoose.model<IStudentUser>("studentUser", StudentUserSchema);

export default studentUser;