// const express=require("express");
// const {connection } = require("./src/Database");


// const app = express();

// const PORT = 4000;

// app.get("/",(req,res)=>{
//     res.send('Sever running on port ${PORT}');

// });
// connection();

// app.listen(PORT,() =>{
//     console.log('Server running on port ${PORT}');
// });
import express from 'express'
import bodyParser  from 'body-parser';
import { db } from './src/Database/index.js';
import dotenv from 'dotenv'
// import { userRouter } from './src/route/userRoute.js';
// import { userRouter } from './src/route/userRoute.js';

import {userRouter} from './src/route/index.js'


dotenv.config();


const app=express();

const port=process.env.PORT||5000
app.use(bodyParser.json());
app.use('/api/users',userRouter)

app.listen(5000,function(){
  console.log("project running in port ")
  db()
})