const mongoose = require('mongoose')

const DbSession = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db.js sab acha hai")
    } catch (error) {
        console.log("gadbad db.js mei hai" , error)
        process.exit(1)
    }
}

module.exports = DbSession