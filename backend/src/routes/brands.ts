import {Router} from 'express';
import passport from "passport";

import { 
    listBrands,
    createBrand
} from '../controllers/brandsController';
import { validateData } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createBrand);
router.get('/', listBrands);
  
export default router;