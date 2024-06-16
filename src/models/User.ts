import mongoose from "mongoose";

// name,
// email,
// password: hashPassword,
// role,

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
