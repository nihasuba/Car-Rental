import mongoose from "mongoose";

const connectDB = async (req,res) =>{
    try {
        mongoose.connection.on("Connected",()=>console.log("Database Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/car-rental`)
    } catch (error) {
        console.log(error)

    }
}
export default connectDB;