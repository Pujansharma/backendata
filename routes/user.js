const express=require("express");
const {Usermodel}=require("../model/user");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const UserRouter=express.Router();
require("dotenv").config();

//Register User
UserRouter.post("/api/register", async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const hashpass=await bcrypt.hash(password, 10);
        const users= new Usermodel({name,email,password:hashpass});
        await users.save();
        res.status(201).json({message:"User registered succesfully"})
    } catch (error) {
        res.status(500).json({error:'Error registering'})
    }
});

//Login user
UserRouter.post("/api/login", async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await Usermodel.findOne({email});
        if(!user){
            return res.status(401).json({error:"Invalid credentail"})
        }
        const ispass=await bcrypt.compare(password, user.password);
        if(!ispass){
            return res.status(401).json({error:"Invalid credentail"})
        }
        const token=jwt.sign({userId:user._id},"masai")
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error:"Invalid credentail"})
    }
});


module.exports={UserRouter}