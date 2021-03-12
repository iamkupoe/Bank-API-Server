//import express
const express = require('express');

//create an instance of express router
const router = express.Router();

//import controllers
const {listBankController, createBankController, updateBankController, deleteBankController} = require('../controllers/bankController');

//create routes
router.get('/bank/:id?', listBankController);

router.post('/bank', createBankController);

router.put('/bank', updateBankController);

router.delete('/bank', deleteBankController);


module.exports = router;