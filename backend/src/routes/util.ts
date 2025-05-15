import {Router} from 'express';

import { 
    getMenu,
    getCategoryMap
} from '../controllers/utilController';

const router = Router();

router.get('/menu', getMenu);
router.get('/categorymap', getCategoryMap);
  
export default router;