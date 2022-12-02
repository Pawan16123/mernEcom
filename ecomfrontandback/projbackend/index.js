require('dotenv').config();
require('./connection.js'); //DB connection

// const mongoose = require("mongoose");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Import routes
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const categoryRouter = require('./routes/category.js');
const productRouter = require('./routes/product.js');
const orderRouter = require('./routes/order.js');
const stripeRouter = require('./routes/stripeRoute.js');


// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



// Routes
app.use('/api', authRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/payment', stripeRouter);

app.get('/',(req,res)=>{
    res.send(`Your unique id is : ${uuidv4()}`);
})


// Static Files
app.use(express.static(path.join(__dirname, '../projfrontend/build')));
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, "../projfrontend/build/index.html"))
})

app.listen(port,()=>{
    console.log(`Server is running on PORT: ${port}`);
});


