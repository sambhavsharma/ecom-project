import {Router} from 'express';
import passport from "passport";

import { 
    createUser,
    getUser,
    getSeller,
    updateUser
} from '../controllers/usersController';
import { validateData } from '../middlewares/validationMiddleware';
import { createUserSchema } from '../db/users';

const router = Router();

router.post('/', validateData(createUserSchema), createUser);
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);
router.get('/:id/seller', getSeller);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);

export default router;