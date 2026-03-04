require('dotenv').config()
const express = require('express')
const router = require('./routes/authRoutes.js')

const app = express()
const DbSession = require('./config/db.js')

const port = process.env.PORT||5000

app.use(express.json())


app.use('/api/auth' , router)

DbSession().then(() => {
    app.listen(port, () => {
        console.log("app is running on port", port);
    });
}).catch((err) => {
    console.log("error in app.listen", err);
});
