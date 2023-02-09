const express = require('express');
const app=express();
const cors=require('cors');
const router=require('./route/route.js')
const dotenv = require('dotenv')
const multer = require('multer')
dotenv.config()
const port=process.env.port
const mongoose=require('mongoose');
mongoose.connect(process.env.db_link ,()=>{
    console.log(' Local database connected sucessfully')
})
app.use(express.json());
app.use(cors());
app.use('/', router);
app.listen(port,()=>{
    console.log(`server is running on the port ${port}`)
})