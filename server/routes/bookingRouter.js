import express from 'express'
import { changeBookingStatus, checkAvailability, checkCarAvailability, createBooking, getOwnerBooking, getUserBooking } from '../controller/bookingController.js';
import { protect } from '../middleware/auth.js';


const bookingRouter = express.Router();


bookingRouter.post('/check-availability',checkCarAvailability)
bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/user',protect,getUserBooking)
bookingRouter.get('/owner',protect,getOwnerBooking)


export default bookingRouter;