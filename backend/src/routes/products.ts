import {Router} from 'express';
import passport from "passport";

import { 
    listProducts, 
    getUserProducts,
    getProduct, 
    createProduct,
    updateProduct, 
    deleteProduct 
} from '../controllers/productsController';
import { validateData } from '../middlewares/validationMiddleware';
import { createProductSchema, updateProductSchema } from '../db/products';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);

router.get('/user/:user_id', passport.authenticate(["jwt", "anonymous"], { session: false }), getUserProducts);

router.post('/', passport.authenticate('jwt', { session: false }), createProduct);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateProduct);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteProduct);
  
export default router;