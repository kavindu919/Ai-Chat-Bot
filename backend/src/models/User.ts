import mongoose from "mongoose";
import { randomUUID } from "crypto";

//make chat schema
const chatschema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(), //coming from crypto make to genrate random ids
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
//make user schema for the users of the system
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatschema],
});

export default mongoose.model("User", userSchema);
