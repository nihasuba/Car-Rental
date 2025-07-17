import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import ownerRouter from "./routes/ownerRouter.js";
import bookingRouter from "./routes/bookingRouter.js";


// Initialize Express app
const app = express();

// Connect Database
await connectDB()
//Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.send("Server is Running"))
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/booking',bookingRouter)

// Set the port
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));