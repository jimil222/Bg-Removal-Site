import mongoose, { mongo } from "mongoose";
import Razorpay from "razorpay";

const transactionSchema = new mongoose.Schema({
    clerkId:{type:String,required:true},
    plan:{type:String,required:true},
    credits:{type:Number,required:true},
    payment:{type:Boolean,default:false},
    date:{type:Number},
})

const transactionModel = mongoose.models.transaction||mongoose.model('transaction',transactionSchema)

export default transactionModel