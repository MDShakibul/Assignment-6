import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();


router.get('/:id', ProductController.getSingleProduct);

router.get('/', ProductController.getAllProduct);

export const ProductRoutes = router;