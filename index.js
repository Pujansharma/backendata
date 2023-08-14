const express=require("express");
const {connection}=require("./connection/config")
const {UserRouter}=require("./routes/user")
const {flightRoute}=require('./routes/flight')
const {bookingRoute}=require("./routes/bookong")
require("dotenv").config();
const app=express();
app.use(express.json());
const port=process.env.port || 4500;
app.use("/",UserRouter)
app.use("/",flightRoute)
app.use("/",bookingRoute)


app.listen(port, async()=>{
    try {
        await connection;
        console.log({"mssg":"database connected"})
    } catch (error) {
        console.log({"error":error.message})
    }
    console.log(`server is runing on port ${port}`)
})