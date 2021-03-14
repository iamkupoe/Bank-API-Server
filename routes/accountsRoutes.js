//import express
const express = require('express');
//import express-validator
const { body } = require('express-validator');
//import an instance of express router
const router = express.Router();
//import controllers
const {createAccountController, listAccountController, deleteAccountController} = require('../controllers/accountController');

//create controllers
router.post('/account',[body("accountName")
.notEmpty()
.withMessage("accountName is required"),
body("accountNumber")
.notEmpty()
.withMessage("accountNumber is required")
.isNumeric()
.withMessage("accountNumber is figures")
.isLength()
.withMessage({min: 12, max: 12})], createAccountController);

router.get('/account/:id?', listAccountController);

router.delete('/account/:id?', deleteAccountController);

module.exports = router;