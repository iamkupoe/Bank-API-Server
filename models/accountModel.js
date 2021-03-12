const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    accountName: {
        type: String,
        required: true,
    },

    accountNumber: {
        type: String,
        required: true,
    },

    accountType: {
        type: String,
        required: true,
    },

    bankId: {
        type: Schema.Types.ObjectId,
        ref: "Bank"
    }
   
});

//Define AccountModel
const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;