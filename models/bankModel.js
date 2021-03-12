//Import mongoose
const mongoose = require('mongoose');

//Define BankSchema
const Schema = mongoose.Schema;
const BankSchema = new Schema({
    bankName: { 
        type: String
    },
    bankBranch: {
        type: String
    },

    bankAddress: {
        type: String
    },

    bankLocation: {
        type: String
    },

    bankPhoneNumber: {
        type: String
    },

    accounts: [
        {accountsId: {type: Schema.Types.ObjectId, required: true, ref: "Account" }
    
        }
    ]

});

//Define Model
const BankModel = mongoose.model("Bank", BankSchema);

module.exports = BankModel;