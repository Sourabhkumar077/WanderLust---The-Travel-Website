import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

userSchema.plugin(passportLocalMongoose);

const User = model("User", userSchema);

export default User;
export const authenticate = User.authenticate();
export const serializeUser = User.serializeUser();
export const deserializeUser = User.deserializeUser();
export const register = User.register.bind(User);