import {Router} from 'express';
import { 
    listProducts, 
    getProduct, 
    createProduct,
    updateProduct, 
    deleteProduct 
} from '../controllers/productsController';
import { validateData } from '../middlewares/validationMiddleware';
import { createProductSchema, updateProductSchema } from '../db/products';

const router = Router();

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './media')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


router.get('/', listProducts);
router.get('/:id', getProduct);
// router.post('/', validateData(createProductSchema), createProduct);

// router.post('/', upload.array("media"), createProduct);

// router.post('/', function(req, res){

//     const upload = multer({ storage: storage }).array("media", req.body.media.length);

//     upload(req, res, function (err) {

//         console.log(req.files);
//         createProduct(req, res);
//     });
// });

router.post('/', createProduct);

router.put('/:id', validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);
  
export default router;