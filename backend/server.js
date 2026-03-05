require('dotenv').config()
const express = require('express')
const router = require('./routes/authRoutes.js')
const cors = require('cors')

const app = express()
const DbSession = require('./config/db.js')

const port = process.env.PORT||5000

app.use(express.json())

const allowedOrigins = ['http://localhost:5000', 'http://localhost:5173'];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))


app.use('/api/auth' , router)

DbSession().then(() => {
    app.listen(port, () => {
        console.log("app is running on port", port);
    });
}).catch((err) => {
    console.log("error in app.listen", err);
});
