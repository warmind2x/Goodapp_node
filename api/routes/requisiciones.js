const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');



import Project from "../models/project.js";
import Requisicion from "../models/requisicion.js";


//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************

// Create Requisiciones
router.post("/req",  async (req, res) => {
  try {
    const requisicion = new Requisicion({
      _id: new mongoose.Types.ObjectId(),
      shoppingCart: req.body.newReq.shoppingCart,
      descripcionGasto: req.body.newReq.descripcionGasto,
      cost: Number(req.body.newReq.cost),
      ordenCompra: req.body.newReq.ordenCompra,
      fechaGasto: req.body.newReq.fechaGasto
       
    });

    const savedRequisicion = await requisicion.save()

    const project = await Project.findOne({lcpCode:req.body.newReq.lcpCode})
    project.requisiciones.push(savedRequisicion._id)
    const savedProject = await project.save()
    console.log(savedProject)

     
   

    const response = {
      status: "success"
    };

    return res.json(response);
  } catch (error) {
    console.log("ERROR CREATING NEW REQUESITION");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    return res.status(500).json(response);
  }
});

  //GET requisiciones
router.get("/requisiciones", async (req, res) => {
  try {
    const userId = "ZA51560";

    //get devices
    var req = await Requisicion.find({ userId: userId });

    //mongoose array to js array
    req = JSON.parse(JSON.stringify(req));

   
    const response = {
      status: "success",
      data: req
    };

    res.json(response);
  } catch (error) {
    console.log("ERROR GETTING REQUISICIONES");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    return res.status(500).json(response);
  }
});

//DELETE DEVICE
router.delete("/req",  async (req, res) => {
  try {
    const shoppingCart = req.query.shoppingCart;
    console.log(req.query)
    
      

    //deleting device
    const result = await Requisicion.deleteOne({ shoppingCart: shoppingCart });
    const response = {
      status: "success",
      data: result
    };

    return res.json(response);
    

      
    }

    
   catch (error) {
    console.log("ERROR DELETING PROJECT");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    return res.status(500).json(response);
  }
});

//UPDATE DEVICE (SELECTOR)
router.put("/req",  async (req, res) => {
  try {
    var editReq = req.body.editReq;
    console.log(editReq);

    const requisition = await Requisicion.replaceOne({shoppingCart: editReq.shoppingCart},editReq);

    if (requisition.acknowledged == true ) {
      const response = {
        status: "success"
      };

      return res.json(response);
    } else {
      const response = {
        status: "error"
      };

      return res.json(response);
    }
  } catch (error) {
    console.log(error);
  }
});

  module.exports = router;