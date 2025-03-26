import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('List of products!')
})

router.get('/:id', (req, res) => {
    res.send('Product: ' + req.params.id)
})


router.post('/', (req, res) => {
    res.send('Create a product!')
})
  
export default router;