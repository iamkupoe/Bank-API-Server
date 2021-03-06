//import express,  body-parser and mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {listBankController, createBankController, updateBankController, deleteBankController} = require('./controllers');


  //create an express server instance
const server = express();

//define middleware
server.use(bodyParser.json());

/**const handleGetBank = (req, res) => {
    const banks = BankModel.listBanks();
    res.status(200).json(banks);

}**/

//routes
server.get('/bank/:id?', listBankController);

server.post('/bank', createBankController);

server.put('/bank', updateBankController);

server.delete('/bank', deleteBankController);

//connect to database and start server
mongoose.connect("mongodb+srv://codetrainUser:biometrics@cluster0.ooft8.mongodb.net/codetrain?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
.then( result => {
     server.listen(5000, ()=> console.log('Server is running'));
  }).catch(err => console.log(err));