//import express
const express = require('express');

//import an instance of express router
const router = express.Router();

//import controllers
const {createAccountController, listAccountController} = require('../controllers/accountController');

//create controllers
router.post('/account', createAccountController);

router.get('/account/:id?', listAccountController);

module.exports = router;