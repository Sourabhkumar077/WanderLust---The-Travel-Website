import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

let reviewSchema = new Schema({
    comment : String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type : Schema.Types.ObjectId,
        ref:"User"
    }
});

export default model("Review",reviewSchema);