import mongoose , {Schema, Document, Model} from "mongoose";

interface IStudentUser extends Document {
    IDnumber: string;
    name: string;
    course: string;
    yearLevel: number;
    timeIn: Date | null; 
    timeOut: Date | null;

    
}
const StudentUserSchema = new Schema<IStudentUser>({
    IDnumber: { type: String, required: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    yearLevel: { type: Number, required: true },
    timeIn: { type: Date,default: null },
    timeOut: { type: Date,default: null },
});


const studentUser: Model<IStudentUser> = mongoose.models.studentUser || mongoose.model<IStudentUser>("studentUser", StudentUserSchema);

export default studentUser;