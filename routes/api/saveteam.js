let mongoose = require('mongoose');
let express = require('express');
const multer = require('multer');
let router = express.Router();
const fs = require("fs");
let PatientSchema = require('../../models/patient');
let UserSchema  = require('../../models/User');
const Axios =  require('axios');
const { route } = require('./users');

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}
let random = between(1,900000000)

router.route('/myteam').post((req, res, next) =>{
    PatientSchema.create(req.body).then((data)=>{
        console.log(data);
        if(data){
            res.json(data);
        }
        else{
            console.log("failed");
        }
    })
})

router.route('/get-all-patients').post((req,res, next) =>{
    PatientSchema.find({doctor: req.body.doctor}, (error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data);
        }
    })
})

router.route('/get-total-patients').post((req,res, next) =>{
    PatientSchema.find((error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data);
        }
    })
})

router.route('/get-my-team').post( (req,res, next) =>{
    PatientSchema.findById(req.body.id, async (error,data)=>{
        if(error){
            return next(error)
        }
        else{
           
            
            res.json(data);
        }
    })
})

router.route('/get-api').post( async (req,res, next) =>{
    
            Axios.defaults.headers.common['User-Agent'] = 'PostmanRuntime/7.26.2';
            const resEvent = await Axios({
                method: "GET",
                url: `https://fantasy.premierleague.com/api/fixtures/?event=35`,
                
              });
              const resPlayer = await Axios({
                method: "GET",
                url: `https://fantasy.premierleague.com/api/bootstrap-static/`,
                
              });
            
            res.json({"apiEvent":resEvent.data,"apiPlayer":resPlayer.data});
})

router.route('/delete-patient').post((req,res)=>{
    console.log(req.body)
    PatientSchema.findByIdAndRemove(req.body.id, (error,data)=>{
        if(error){
            
        }
        else{
            res.json(data)
        }
    })
})

router.route('/add-consultant').post((req, res)=>{
   PatientSchema.findByIdAndUpdate(req.body.id,{$set:{newInfo:req.body.consultant}}, (error, data)=>{
       if(error){
           console.log(error)
       }
       else{
           res.json(data)
       }
   })
})

module.exports = router;