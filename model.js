//Import mongoose
const mongoose = require('mongoose');

//Define BankSchema
const BankSchema = new mongoose.Schema({
    name: String,
    branch: String,
    address: String,
    location: String,
    phone: String,
    accountNumber: String,
});

//Define Model
const BankModel = mongoose.model("Bank", BankSchema);

module.exports = BankModel;