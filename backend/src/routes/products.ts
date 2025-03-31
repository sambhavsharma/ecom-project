import {Router} from 'express';
import { 
    listProducts, 
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
router.post('/', validateData(createProductSchema), createProduct);
router.put('/:id', validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);
  
export default router;