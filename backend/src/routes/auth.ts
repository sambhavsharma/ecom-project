import {Router} from 'express';
import { 
    login
} from '../controllers/authController';
import passport from "passport";

const router = Router();

router.post('/login',passport.authenticate('local'), login);
  
export default router;