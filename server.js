const express=require('express');
const path=require('path');
const port=process.env.PORT || 8080;
const passport=require('passport');
const TwitterStrategy=require('passport-twitter').Strategy
const mongoose = require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const configDB = require('./config/database.js');
const router=require('./router');
const http=require('http');

const app=express.createServer();


app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json({type:'*/*'})); // get information from html forms
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/style'));
app.use(cors());
router(app);


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

app.listen(port);
console.log('The party is on port ' + port);
