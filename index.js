require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const App = express();
const mongourl = process.env.MONGO_URL;
const port = process.env.SERVER_PORT


App.use(express.json())
App.use('/', router)

mongoose.connect(mongourl).then(()=>{
    console.log('mongodb is connected');
    App.listen(3000, () => {
        console.log('app is running on this port ')
    
    })
}).catch((er)=>{
    console.log(er);
    
})


