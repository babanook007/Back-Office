import mongoose, { Schema, Document, Model } from "mongoose";

const userSchema = new Schema({
    username: String,
});

interface IUser extends Document {
    username: string;
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
