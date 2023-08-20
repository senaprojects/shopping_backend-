import express from 'express';
import {getAllusercart,createCart,getUsercart,updateCart,cartDelete,checkoutDelete} from '../controllers/cartController.js';
const router=express.Router()
router.get('/',getAllusercart);
router.post('/create',createCart);
router.get('/:userid',getUsercart);
router.put('/:id',updateCart);
router.delete('/:userid/:productid',cartDelete);
router.delete('/:userid',checkoutDelete)
export default router;