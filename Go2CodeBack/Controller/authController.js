const filePath= require('path')
const userModel=require('../Model/useModel')
const jwt =require('jsonwebtoken');

const tokenServer = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR, { expiresIn: '30m' });
};


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
        const user= await userModel.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            photo:req.file?req.file.filename:'default.jpg'
        });
        // if(!user){
        //     return res.status(500).json({
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
exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email }).select(['password', 'name', 'email', 'photo']);
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'User not found'
                }
            });
        }

        const isSame = await user.isSamePassword(req.body.password, user.password);
        if (!isSame) {
            return res.status(404).json({
                status: 'fail',
                data: {
                    message: 'Password mismatch'
                }
            });
        }
        console.log('user : ' + user)

        const token = tokenServer(user._id);
        const path = `http://localhost:3005/static/Images/${user.photo}`; // Construct the full image path////////////////////////////////////////////////////////////////
        console.log('path: ', path);

        res.status(200).json({
            status: 'success',
            data: {
                token,
                url: path, // Sends the full path to the photo////////////////////////////////////////////////////////////////////////////////////////
                name: user.name,
                email: user.email,
                id: user._id
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            data: {
                message: "Error " + error.message
            }
        });
    }
};
