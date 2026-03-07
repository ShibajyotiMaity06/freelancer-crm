const router = require('express').Router()

const {protect} = require('../middlewares/authMiddleware.js')

const {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
} = require('../controllers/leadController.js')

router.use(protect)

router.route('/').get(getLeads).post(createLead)

router.route('/:id').get(getLeadById).patch(updateLead).delete(deleteLead)

module.exports = router