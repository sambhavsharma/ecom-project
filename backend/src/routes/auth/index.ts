import {Router} from 'express';
import { 
    login, 
    register 
} from './authController';
import { validateData } from '../../middlewares/validationMiddleware';
import { createUserSchema } from '../../db/usersSchema';
import passport from "passport";

const router = Router();

router.post('/login',passport.authenticate('local'), login);
router.post('/register', validateData(createUserSchema), register);
  
export default router;