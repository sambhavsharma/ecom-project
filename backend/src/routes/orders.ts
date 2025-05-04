import {Router} from 'express';
import passport from "passport";

import { 
    getUserOrder, 
    getUserOrders,
    createOrder
} from '../controllers/ordersController';
const router = Router();

router.post('/',passport.authenticate('jwt', { session: false }), createOrder);
router.get('/:id/user',passport.authenticate('jwt', { session: false }), getUserOrder);
router.get('/user',passport.authenticate('jwt', { session: false }), getUserOrders);
  
export default router;