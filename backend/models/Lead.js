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
            trime:true,
        },
        company : {
            type:String,
            required:true,
            trime:true
        },
        source : {
            type:String,
            required:true,
            trime:true,
            enum:["Linkedin" , "Twitter" , "Cold mailing" , "previous Client", "Upwork"],
            default:"Twitter",
        },

        dealValue:{
            type:Number,
            required:true,

        },
        status:{
            type:String,
            required:true,
            enum:["New" , "Porposal Sent" , "Negotiation" , "Closed Won" , "Closed Lost"],
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