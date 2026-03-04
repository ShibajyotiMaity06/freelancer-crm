require('dotenv').config()
const express = require('express')

const app = express()
const DbSession = require('./config/db.js')

const port = process.env.PORT||5000

app.use(express.json())

app.use('/' , (req , res)=>{
    res.send('anni good')
})

DbSession().then(() => {
    app.listen(port, () => {
        console.log("app is running on port", port);
    });
}).catch((err) => {
    console.log("error in app.listen", err);
});
