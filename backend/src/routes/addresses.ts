import {Router} from 'express';
import passport from "passport";

import { 
    createAddress,
    createUserAddress,
    getUserAddress,
    updateAddress
} from '../controllers/addressesController';
import { validateData } from '../middlewares/validationMiddleware';
import { createAddressSchema } from '../db/addresses';

const router = Router();

router.post('/',  passport.authenticate('jwt', { session: false }), validateData(createAddressSchema), createAddress);
router.post('/users/:id',  passport.authenticate('jwt', { session: false }), createUserAddress);
router.get('/users/:id', passport.authenticate('jwt', { session: false }), getUserAddress);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateAddress);

export default router;