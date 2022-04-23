// const express=require('express');
// const { default: mongoose } = require('mongoose');
// const app=express();
// const path=require('path');
// const static_path=path.join(__dirname,"../public/");
// //models

// //

// var dbConn=require("./db/conn");

// const process=require('process');
// const port=process.env.PORT || 3000;
// app.use(express.static(static_path));

// app.listen(port,()=>{
//     console.log("is running");
// });

const view=require("../node_modules/express/lib/view");
const application=require("../node_modules/express/lib/application");
const view=require("../node_modules/express/lib/view");






const path=require('path');
const Register=require('./details');

var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
const { Console } = require('console');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
const static_path=path.join(__dirname,"../public/");
app.use(express.static(static_path));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var username = req.body.username;
    var password =req.body.password;
  
    var data = {
        "name": name,
        "email":email,
        "username":username,
        "password":password
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('new.html');
})
app.post('/login',async(req,res)=>{
    try {
        const username=req.body.username;
        const password=req.body.password;
        console.log(username);
        const user=await db.collection('details').findOne({username:username});
        console.log(user);
        if(user.password===password)
        {
            res.redirect("./index.html");
        }
        else{
            res.send("pass not correct");
        }
    } catch (error) {
        res.send("invalid username");
        console.log(error);
        
    }
})
  
  
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('index.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");
