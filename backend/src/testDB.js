import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const debugDB = async () => {
  console.log("🔹 Starting MongoDB connection test...");

  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not found in .env");
    process.exit(1);
  }

  console.log("MONGO_URI from .env:", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 sec timeout
      ssl: true, // enable SSL/TLS
    });

    console.log("✅ MongoDB connected successfully!");
    const db = mongoose.connection;
    console.log("MongoDB readyState:", db.readyState);
    console.log("MongoDB host info:", db.hosts);

    const admin = db.db.admin();
    const info = await admin.serverStatus();
    console.log("MongoDB server status retrieved:", info.ok);

    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.reason) console.error("Reason:", error.reason);
    if (error.code) console.error("Error code:", error.code);
    if (error.stack) console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

debugDB();
