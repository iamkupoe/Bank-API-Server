//import express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

  //create an express server instance
const server = express();

//define middleware
server.use(bodyParser.json());

//create DB
const banksDb = [];

//define model
class BankModel {
    constructor(name, branch, address, location, phone, accountNumber) {
        this.name = name;
        this.branch = branch;
        this.address = address;
        this.location = location;
        this.phone = phone;
        this.accountNumber = accountNumber;
    }

    save = () => {
        banksDb.push(this);
        return this;
    }

     static all(){
      return banksDb;
     }

     static update(updateInfo = {}){
       banksDb.map(bank => {
         if(bank.name === updateInfo.name){
           return {...bank, ...updateInfo};
         }
         return bank;
        })
     }

     static delete({name}){
       let deletedBank = null;
       banksDb.filter(bank =>{
        console.log(bank.name === name)
         if(bank.name !== name){
           
           return true;
         }
         deletedBank = bank;
         return false;
       });
       return deletedBank;
     }
      
}

  //define controllers
const listBankController = (req, res) => {
   const bank = BankModel.all();
    res.json({data: bank});
};

const createBankController = (req, res) => {
  const {name, branch, address, location, phone, accountNumber} = req.body;
  const bank = new BankModel(name, branch, address, location, phone, accountNumber); bank.save();
  res.status(201).json({ message: "Bank created successfully!", data: bank});
};

const updateBankController = (req, res) => {
  const {name, branch, address, location, phone, accountNumber} = req.body;
  const updatedBank = BankModel.update({name, branch, address, location, phone, accountNumber});
  res.json({message: "Bank updated successfully", data: updatedBank});
};

const deleteBankController = (req, res) => {
  const {name} = req.body;
  const deletedBank = BankModel.delete({name});
   res.json({message: "Bank deleted", data: deletedBank});
};

/**const handleGetBank = (req, res) => {
    const banks = BankModel.listBanks();
    res.status(200).json(banks);

}**/

//routes
server.get('/bank', listBankController);

server.post('/bank', createBankController);

server.put('/bank', updateBankController);

server.delete('/bank', deleteBankController);

//start server
server.listen(5000, ()=> console.log('Server is running'));