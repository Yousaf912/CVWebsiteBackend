require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const App = express();
const mongourl = process.env.MONGO_URL;
const port = process.env.SERVER_PORT;
const cors = require("cors");

const corsoption ={
    origin : 'http://localhost:5173',
    methods:['POST','PUT','DELETE','GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}


App.use(cors(corsoption))
App.use(express.json())
App.use('/', router)

mongoose.connect(mongourl).then(()=>{
    console.log('mongodb is connected');
    App.listen(3000, () => {
        console.log(`app is running on this port 3000`)
    
    })
}).catch((er)=>{
    console.log(er);
    
})


