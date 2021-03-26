//import express
const express = require('express');
//import express validation
const { body } = require('express-validator');
//import isAuth
const isAuth = require('../middlewares/is-auth')

//create an instance of express router
const router = express.Router();

//import controllers
const {listBankController, createBankController, updateBankController, deleteBankController} = require('../controllers/bankController');

//create routes
router.get('/bank/:id?', isAuth, listBankController);

router.post('/bank', [
body("name")
.notEmpty()
.withMessage("Bank name is required"),
body("branch")
.notEmpty()
.withMessage("Bank branch is required")
], isAuth, createBankController);

router.put('/bank', isAuth, updateBankController);

router.delete('/bank', isAuth, deleteBankController);


module.exports = router;