const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        name : {
            type:String,
            required:true,
            trim:true,
        },
        company : {
            type:String,
            trim:true
        },
        source : {
            type:String,
            trim:true,
            enum:["LinkedIn" , "Upwork" , "Referral" , "Cold Outreach", "Other"],
            default:"Other",
        },

        dealValue:{
            type:Number,
            required:true,
        },
        status:{
            type:String,
            enum:["New" , "Contacted" , "Proposal Sent" , "Negotiation" , "Won" , "Lost"],
            default:"New",
        },
        nextFollowUpDate:{
            type:Date,
            required:true,
        },
        notes:{
            type:String,
            trim:true,
        }
    },
   {
    timestamps:true,
   } 
)

const Lead = mongoose.model("Lead" , LeadSchema)
module.exports = Lead