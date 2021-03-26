const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
//import express validation Result
const { validationResult} = require("express-validator");
//import json web token
const jwt = require("jsonwebtoken");

//Create Account Controllers
const createUserController = (req, res) => {
    const {username, email, password} = req.body;

     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
     }
     
     bcrypt.hash(password, 10).then(hashedPassword =>{

        const user = new UserModel({username, email, password: hashedPassword}); 

    user.save().then( result => {
        if(result){
            res.status(201).json({ message: "User created successfully!", data: result });
        }else 
            res.json({message: "Failed to create User"})
          
       }).catch( error => console.log(error)).catch(err => console.log(err));

     });
 
}

const signInUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.json({ message: errors.array()[0].msg })
    }
    const {email, password} = req.body;

     //find the user with email in database
     const user = await UserModel.findOne({email});
     if(!user){
      return res.json({message: "User not found"});
     }

     //compare passwords
     const isAuth = await bcrypt.compare(password,user.password);
     if(!isAuth){
      return res.json({message: "Password incorrect"});
     }

     const token = jwt .sign(
       {name: user.name, email: user.email, userId: user._id},
       'howcanyoubreakhtissupersecretkeyeasily',
       {expiresIn: '1hr'}
     );

     return res.json({message: "User signed in", token});
  } catch (error) {
    res.json({message: "Server error! Please try again" });
  }
}


module.exports = {
  createUserController,
  signInUserController,
}