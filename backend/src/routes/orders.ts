import {Router} from 'express';
import { 
    listOrders, 
    getOrder, 
    createOrder,
    updateOrder
} from '../controllers/ordersController';
import { validateData } from '../middlewares/validationMiddleware';
import { createOrderSchema, updateOrderSchema } from '../db/ordersSchema';

const router = Router();

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', validateData(updateOrderSchema), updateOrder);
  
export default router;