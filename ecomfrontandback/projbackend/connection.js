const mongoose = require("mongoose");
const express = require("express");
const app = express();


mongoose.connect(process.env.DB).then(()=>{
    console.log( `Database connection established DB: ${process.env.DB.split('.net/')[1].split('?')[0]}`);
}).catch((err)=>{
    console.log("Connection Failed");
})