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
        console.error(error)
    }

});

module.exports = router;