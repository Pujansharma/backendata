const express=require("express");
const {flightModel}=require("../model/flight");
const {authentication}=require("../middleware/Authorized")
const flightRoute=express.Router();


//get all the flight

flightRoute.get("/api/flights",async(req,res)=>{
    try {
        const data=await flightModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error:"Error getting"})
    }
})


//get flight by id

flightRoute.get("/api/flights/:id",async(req,res)=>{
    try {
        const data=await flightModel.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error:"Error getting"})
    }
})

flightRoute.post("/api/flights", authentication, async(req,res)=>{
    try {
        const data= new flightModel(req.body);
        await data.save();
        res.status(200).json({message:"Flight added succesfully"})
    } catch (error) {
        res.status(500).json({error:"Error adding flight"})
    }
})


flightRoute.patch("/api/flights/:id", authentication, async(req,res)=>{
    try {
       await flightModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error:"Error updating flight"})
    }
})

flightRoute.delete("/api/flights/:id", authentication, async(req,res)=>{
    try {
       await flightModel.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error:"Error updating flight"})
    }
})


module.exports={flightRoute}
