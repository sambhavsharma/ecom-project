import {Router} from 'express';
import { 
    login,
    googleLogin,
    check
} from '../controllers/authController';
import passport from "passport";

const router = Router();

// The authenticate strategy is probably not needed, we could do this work in the model itself
router.post('/login',passport.authenticate('local'), login);
router.post('/google/login', googleLogin);
router.get('/check',passport.authenticate('jwt', { session: false }), check);
  
export default router;