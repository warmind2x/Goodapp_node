const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/authentication.js");
//const jwt = require("jsonwebtoken");


import Project from "../models/project";

//POST -> req.body
//GET -> req.query

//******************
//**** A P I *******
//******************

//NEW DEVICE
router.post("/project", checkAuth,  async (req, res) => {
    try {
      console.log(req.userId)
      var newProject = req.body.newProject;
      newProject.userId = 'za51560'
      newProject.status = 'OPEN'
      console.log(newProject)
     
      
  
      const project = await Project.create(newProject);
  
      
  
      const response = {
        status: "success"
      };
  
      return res.json(response);
    } catch (error) {
      console.log("ERROR CREATING NEW PROJECT");
      console.log(error);
  
      const response = {
        status: "error",
        error: error
      };
  
      return res.status(500).json(response);
    }
  });

  //GET DEVICES
router.get("/project",  async (req, res) => {
  try {
    

    //get devices
    await Project.find({  }).populate('requisiciones').exec(function(err,projects){

      console.log(err);
      console.log(projects);

      if (err) return handleError(err);
      //mongoose array to js array
    projects = JSON.parse(JSON.stringify(projects));
    const response = {
      status: "success",
      data: projects
    };
    res.json(response);
    });

    //mongoose array to js array
    //projects = JSON.parse(JSON.stringify(projects));

   
    //const response = {
     // status: "success",
     // data: projects
    //};

    //res.json(response);
  } catch (error) {
    console.log("ERROR GETTING PROJECTS");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    return res.status(500).json(response);
  }
});

//DELETE DEVICE
router.delete("/project",   async (req, res) => {
  console.log(req)
  try {
    const lcpCode = req.query.lcpCode;
    
      

    //deleting device
    const result = await Project.deleteOne({ lcpCode: lcpCode });
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
router.put("/project",  async (req, res) => {
  try {
    console.log(req.body)
    var editProject = req.body.editedProject;

    const project = await Project.replaceOne({lcpCode: editProject.lcpCode},editProject);

    if (project.acknowledged == true ) {
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