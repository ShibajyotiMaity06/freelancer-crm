const User = require('../models/User')
const Lead = require('../models/Lead')

const createLead = async (req , res) => {
    try{
        const {name , company , source , dealValue , status , nextFollowUpDate , notes} = req.body;

        if (!name || !dealValue || !nextFollowUpDate){
            return res.status(400).json({message : "name , deal and next follow date required"})
        }

        const lead = await Lead.create({
            user : req.user._id,
            name,
            company,
            source,
            dealValue,
            status,
            nextFollowUpDate,
            notes,
        })

        res.status(201).json(lead)
    } catch(error) {
        res.status(500).json({message : error.message})
    }

}


const getLeads = async (req , res) => {
    try {
        const leads = await Lead.find({user:req.user._id}).sort({createdAt : -1})

        res.json(leads)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const getLeadById = async (req , res) => {
    try {
        const lead = await Lead.findOne({_id : req.params.id , user : req.user._id})
        if (!lead){
            return res.status(404).json({message : 'no lead found , create first'})
        }
        res.json(lead)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateLead = async (req , res) => {
    try {
        const lead = await Lead.findOne({id : req.params.id , user:req.user._id})

        if (!lead){
            return res.status(404).json({message : 'no lead found , create first'})
        }

        const allowedFields = ['name', 'company', 'source', 'dealValue', 'status', 'nextFollowUpDate', 'notes'];
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined){
                lead[field] = req.body[field]
            }
        })

        const updatedLead = await lead.save()
        res.json(updatedLead)

    } catch (error) {
            res.status(500).json({ message: error.message });
    }
}


const deleteLead = async (req , res) => {
    try {
        const lead = await Lead.findByIdAndDelete({_id : req.params.id , user : req.user._id})

        if (!lead){
            return res.status(404).json({message : 'no lead found'})
        }

        res.json({message : 'lead deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead };