const BankModel = require('./model');

  //define controllers
   const createBankController = (req, res) => {
   const {name, branch, address, location, phone, accountNumber} = req.body;

   const bank = new BankModel({name, branch, address, location, phone, accountNumber}); 
   
   bank.save().then( result => {

    res.status(201).json({ message: "Bank created successfully!", data: result });
   }).catch( error => console.log(error));

 }

 const listBankController = (req, res) => {
  //list all banks
  const {id} = req.params;

  if(id){
    BankModel.find({_id: id}).then( banks => {
      res.json({data: banks});

    }).catch(err => console.log(err));
  }
  else {
    BankModel.find().then( banks => {
      res.json({data: banks});

    }).catch(err => console.log(err));
  }

    
  
};
 
   const updateBankController = (req, res) => {
   const {id, name, branch, address, location, phone, accountNumber} = req.body;

   BankModel.findById(id).then( bank => {
     if(bank){
       bank.name = name;
       bank.branch = branch;
       bank.address = address; 
       bank.location = location;
       bank.phone = phone;
       bank.accountNumber = accountNumber;

       bank.save();
       res.json({message: "Bank updated successfully", data: bank});
     }
     res.json({message: "Document unavailable"});
   }).catch(err => console.log(err));

   {/*const updatedBank = BankModel.update({name, branch, address, location, phone, accountNumber});
   res.json({message: "Bank updated successfully", data: updatedBank});*/}
 };
 
 const deleteBankController = (req, res) => {
   const {id} = req.body;
   BankModel.findByIdAndRemove(id).then( deletedBank => {
     if(deletedBank){
      res.json({message: "Bank deleted", data: deletedBank});
      return;
     }
     res.json({message: "Bank unavailable"});
   });
    
 }

 module.exports = {
    listBankController, 
    createBankController, 
    updateBankController, 
    deleteBankController,
}