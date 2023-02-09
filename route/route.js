const express= require('express');
const router=express.Router();
const logic = require('../controller/control.js');
const sellPropertyLogic=require('../controller/SellPropertyControl')
const { LoginAuth } = require('../loginAuth/LoginAuth.js');
router.post('/signUp',logic)
router.post('/login',LoginAuth)
router.post('/sellProperty',sellPropertyLogic)
module.exports=router