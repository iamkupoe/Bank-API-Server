const AccountModel = require('../models/accountModel');

//Create Account Controllers
const createAccountController = (req, res) => {
    const {accountName, accountNumber, accountType, bankId} = req.body;

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
    const {id} = req.params;
  
if(id){
  AccountModel.find({_id: id}).populate("bankId", "name location branch") .then( accounts => {
    res.json({data: accounts});

  }).catch(err => console.log(err));
}
else {
  AccountModel.find().then( accounts => {
    res.json({data: accounts});

  }).catch(err => console.log(err));
}

}

module.exports = {
    createAccountController, 
    listAccountController,
    //updateAccountController, 
    //deleteAccountController,
}