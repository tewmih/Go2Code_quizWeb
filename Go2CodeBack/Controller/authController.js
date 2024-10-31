
const userModel=require('../Model/useModel')
const jwt =require('jsonwebtoken');

const tokenServer=(id)=>{
    return(jwt.sign({id},process.env.SECRET_STR,{expiresIn:Date.now()+30*60*1000}));
}

// console.log('reached')
exports.signup=async (req,res)=>{
    
    try{
        const isExist=await userModel.findOne({email:req.body.email});
        if(isExist){
            return res.status(400).json({
                status:'error',
                data:{
                    message:'user already exist'
                }
            })  
        }
        const user= await userModel.create(req.body);
        // if(!user){
        //     return res.status(400).json({
        //         status:'error',
        //         data:{
        //             message:'failed to create user\'from database\''
        //         }
        //     })
        // }
        res.status(201).json({
            status:'success',
            data:{
                user
            }
        })

    }catch(err){
        res.status(400).json({
            status: 'error',
            data:{
                message:err.message
            }
        })
    }
}
exports.login=async (req,res)=>{
    try{
        const user= await userModel.findOne({email:req.body.email}).select('password');
        const isSame= await user.isSamePassword(req.body.password,user.password);
        if(!user || !isSame){
            res.status(404).json({
                status:'fail',
                data:{
                    message:'User and/or password mismatch'
                }
            })
            return;
        }
        const token =tokenServer(user._id);
        req.user=user;
       res.status(200).json({
        status:'success',
        data:{
            token,
            user
        }
       })
    }catch(error){
        res.status(404).json({
            status:'fail',
            data:{
                message:"Error "+error.message
            }
        })
    }
}