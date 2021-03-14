//import express
const express = require('express');
//import express validation
const { body } = require('express-validator');

//create an instance of express router
const router = express.Router();

//import controllers
const {listBankController, createBankController, updateBankController, deleteBankController} = require('../controllers/bankController');

//create routes
router.get('/bank/:id?', listBankController);

router.post('/bank', [
body("name")
.notEmpty()
.withMessage("Bank name is required"),
body("branch")
.notEmpty()
.withMessage("Bank branch is required")
], createBankController);

router.put('/bank', updateBankController);

router.delete('/bank', deleteBankController);


module.exports = router;