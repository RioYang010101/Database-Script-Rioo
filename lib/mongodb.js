import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "whatsapp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

const UserSchema = new mongoose.Schema({
  number: { type: String, required: true },
  status: { type: String, enum: ["active", "blacklist"], required: true }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
