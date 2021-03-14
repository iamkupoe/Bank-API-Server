const AccountModel = require('../models/accountModel');
//import express validation Result
const { validationResult} = require("express-validator");

//Create Account Controllers
const createAccountController = (req, res) => {
    const {accountName, accountNumber, accountType, bankId} = req.body;

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const account = new AccountModel({accountName, accountNumber, accountType, bankId}); 

    account.save().then( result => {
        if(result){
            res.status(201).json({ message: "Account created successfully!", data: result });
        }else 
            res.json({message: "Failed to create account"})
          
       }).catch( error => console.log(error));
   
}

const listAccountController = (req, res) => {
    //list all accounts
//if(!accounts) {
//  return res.json({message: "Account does not exist"})
//}
    const {id} = req.params;
  
if(id){
  AccountModel.find({_id: id})
  .populate("bankId").then( accounts => {
    res.json({data: accounts});

  }).catch(err => console.log(err));
}
else {
  AccountModel.find().populate("bankId")
.then( accounts => {
    res.json({data: accounts});

  }).catch(err => console.log(err));
}

}

const deleteAccountController = (req, res) => {
  const {id} = req.body;
  AccountModel.findByIdAndRemove(id).then( deletedAccount => {
    if(deletedAccount){

     AccountModel.deleteMany( {bankId: deletedAccount._id}).then( result => {
       res.json({message: "Account deleted", data: deletedAccount});
      
     }).catch(err => console.log(err));
     
     return;
    }
    
    res.json({message: "Account unavailable"});
  });
   
}


module.exports = {
    createAccountController, 
    listAccountController,
    deleteAccountController,
    //updateAccountController, 
   
}