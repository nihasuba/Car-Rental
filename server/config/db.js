import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    
    mongoose.connection.on("connected", () => {
        console.log("✅ MongoDB Connected Successfully");
    });
    
    mongoose.connection.on("error", (err) => {
        console.log("❌ MongoDB connection error:", err);
    });
    
    mongoose.connection.on("disconnected", () => {
        console.log("⚠️ MongoDB Disconnected");
    });

    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }

        console.log("🔄 Connecting to MongoDB...");
        console.log("📍 MongoDB URL:", process.env.MONGODB_URL.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials in log
        
        await mongoose.connect(`${process.env.MONGODB_URL}/car-rental`, {
            serverSelectionTimeoutMS: 5000,
        });
        
        console.log("✅ MongoDB connection established");
    } catch (error) {
        console.log("❌ Failed to connect to MongoDB");
        console.log("Error:", error.message);
        console.log("\n💡 Troubleshooting tips:");
        console.log("1. Check if MongoDB is running (mongod service)");
        console.log("2. Verify MONGODB_URL in .env file");
        console.log("3. Check network/firewall settings");
        console.log("4. For local MongoDB, try: mongodb://localhost:27017");
        console.log("5. For Atlas, ensure IP is whitelisted\n");
        process.exit(1);
    }
}

export default connectDB;