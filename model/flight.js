const mongoose=require("mongoose");

const flightSchema=mongoose.Schema({
    airline: String,
    flightNo: String,
    departure: String,
    arrival: String,
    departureTime: String,
    arrivalTime: String,
    seats: Number,
    price: Number
})

const flightModel=mongoose.model("flight",flightSchema);

module.exports={flightModel}