import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

export const registered = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.json({success:false ,message:'Missing Details'});
    }
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User Already exist"})
        }
        const hassPassword = await bcrypt.hash(password,10);
        const user = new userModel({name,email,password:hassPassword})
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production' ? 'none':'strict',
            maxAge:604800000,

        });

        } catch (error){
            res.json({success:false,message:error.message});
            
    }

}
export const login = async(req,res)=>{

    
}