var express = require("express");
var app = express();

const mongoose = require('mongoose');
const authRoutes = require('./Model/auth/authRoutes')
const Routes = require('./Model/route')

var port = 3000;

mongoUrl = "mongodb://localhost:27017/spSolutions"

// DB connection 
mongoose.connect(mongoUrl, {useNewUrlParser: true}, (err, connection)=>{
    if(err){

    }else{
        console.log("DB connected!")
    }
})

app.use(express.json());

app.use('/', authRoutes)

app.use('/api', Routes)

app.listen(port, (err, data)=>{
    console.log("listening at ", port)
})