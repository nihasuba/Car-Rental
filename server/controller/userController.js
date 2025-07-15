import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
// Generate JWT token
const generateToken = (userId) =>{
    const payload = userId;
    return jwt.sign(payload,process.env.JWT_SECRET)
}

//Register function
export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password ||password.length< 8){
            return res.json({success:false, message:"All fields are required"})
        }
        const userExist = await User.findOne({email});
        if(userExist){
            return res.json({success:false, message:"User Already Exist"})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashedpassword})
        const token = generateToken(user._id.toString());
        res.json({success:true, message:"User Created",token})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
 
}

//Login function
export const loginUser = async(req,res)=>{
    try {
        const{email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }
        const token = generateToken(user._id.toString());
        res.json({success:true, token});
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

//Get user Data using token
export const getUserData = async(req,res) => {
    try {
        const {user} = req;
        res.json({success:true, user})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message,error: error.stack} )
    }
}
