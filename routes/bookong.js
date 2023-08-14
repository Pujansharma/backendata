const express=require("express");
const {bookingModel}=require("../model/booking");
const {authentication}=require("../middleware/Authorized")
const bookingRoute=express.Router();

bookingRoute.post('/api/booking', authentication, async (req, res) => {
    try {
      const { flightId } = req.body;
      const booking = new bookingModel({
        user: req.userId,
        flight: flightId,
      });
      await booking.save();
      res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
      res.status(500).json({ error: 'Error booking flight' });
    }
  });

  bookingRoute.get('/api/dashboard', authentication, async (req, res) => {
    try {
      const bookings = await bookingModel.find({ user: req.userId })
        .populate('user')
        .populate('flight');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Error getting bookings' });
    }
  });


  bookingRoute.patch('/api/dashboard/:id', authentication, async (req, res) => {
    try {
      await bookingModel.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error updating booking' });
    }
  });


  bookingRoute.delete('/api/dashboard/:id', authentication, async (req, res) => {
    try {
      await bookingModel.findOneAndDelete({ _id: req.params.id, user: req.userId });
      res.status(202).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting booking' });
    }
  });


  module.exports={bookingRoute}