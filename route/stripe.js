import express from 'express';
import { stripeRoute } from '../controllers/stripeContorller.js';
const router=express.Router();

router.post("/",stripeRoute)

export default router;