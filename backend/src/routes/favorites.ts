import {Router} from 'express';
import passport from "passport";

import { 
    createFavorite,
    listFavorites,
    deleteFavorite,
    checkUserFavorite
} from '../controllers/favoritesController';
import { validateData } from '../middlewares/validationMiddleware';
import { createFavoritesSchema } from '../db/favorites';

const router = Router();

router.post('/',  passport.authenticate('jwt', { session: false }), validateData(createFavoritesSchema), createFavorite);
router.get('/', passport.authenticate('jwt', { session: false }), listFavorites);
router.get('/product/:product_id', passport.authenticate('jwt', { session: false }), checkUserFavorite);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteFavorite);


export default router;