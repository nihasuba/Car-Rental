import express from 'express'
import { changeBookingStatus, checkAvailability, checkCarAvailability, createBooking, getOwnerBooking, getUserBooking } from '../controller/bookingController';
import { protect } from '../middleware/auth';
import ownerRouter from './ownerRouter';
const bookingRouter = express.Router();


bookingRouter.post('/check-availability',checkCarAvailability)
bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/user',protect,getUserBooking)
bookingRouter.get('/owner',protect,getOwnerBooking)
ownerRouter.post('/change-status',protect,changeBookingStatus)

export default bookingRouter;