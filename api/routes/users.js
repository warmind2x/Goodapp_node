const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import User from "../models/user";

//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************

router.post("/register", async (req,res)=>{
    try {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password,10);
        const user = await User.create(newUser);

        const response = {
            status: "success"
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            status: "error",
            error: error
        };
         return res.status(500).json(response)
        
    }

});

router.post("/login", async (req, res) =>{
    try {
        console.log(req.body)
        var user = await User.findOne({userId: req.body.userId});
        console.log(user)

    if (!user) {
        const response ={
            status:"error",
            error:"Invalid Credentials"
        };
        console.log("mal")
        return res.status(401).json(response)
        
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
        user.set("password",undefined, {strict:false});
        console.log("bien")

        const token = jwt.sign({userData: user}, "1162@Jdgb!", {expiresIn: 60*60*2 });
        const response = {
            status: "success",
            token:token,
            userData:user
        };
        return res.status(200).json(response)
    } else {
        const response = {
          status: "error",
          error: "Invalid Credentials"
        };
        return res.status(401).json(response);
      }
    } catch (error) {
        console.error(error)
    }
    

});

module.exports = router;