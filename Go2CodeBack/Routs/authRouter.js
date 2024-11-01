const express=require('express');
const multer = require('multer')
const path =require('path')
const fs=require('fs')

const authController=require('../Controller/authController');

const authRouter=express.Router();
const filePath = path.join(__dirname,'../Media/Images/')
if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
}

const storageEngine = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,filePath)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});


const upload=multer({storage:storageEngine})


authRouter.post('/signup',upload.single('photo'),authController.signup);
authRouter.post('/login',authController.login);


module.exports=authRouter;