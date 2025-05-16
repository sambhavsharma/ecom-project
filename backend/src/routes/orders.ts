import {Router} from 'express';
import passport from "passport";

import { 
    getUserOrder, 
    getUserBuyOrders,
    getUserSaleOrders,
    createOrder
} from '../controllers/ordersController';
const router = Router();

router.post('/',passport.authenticate('jwt', { session: false }), createOrder);
router.get('/:id/user',passport.authenticate('jwt', { session: false }), getUserOrder);
router.get('/user/buy',passport.authenticate('jwt', { session: false }), getUserBuyOrders);
router.get('/user/sale',passport.authenticate('jwt', { session: false }), getUserSaleOrders);
  
export default router;