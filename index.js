//import express,  body-parser and mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/accountsRoutes');
const bankRoutes = require('./routes/banksRoutes');
const userRoutes = require('./routes/userRoutes');

  //create an express server instance
const server = express();

//define middleware
server.use(bodyParser.json());
server.use(accountRoutes);
server.use(bankRoutes);
server.use(userRoutes);

//connect to database and start server
mongoose.connect("mongodb+srv://codetrainUser:biometrics@cluster0.ooft8.mongodb.net/codetrain?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
.then( result => {
     server.listen(5000, ()=> console.log('Server is running'));
  }).catch(err => console.log(err));