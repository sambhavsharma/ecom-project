import {Router} from 'express';
import { 
    create 
} from '../controllers/usersController';
import { validateData } from '../middlewares/validationMiddleware';
import { createUserSchema } from '../db/users';

const router = Router();

router.post('/create', validateData(createUserSchema), create);
  
export default router;