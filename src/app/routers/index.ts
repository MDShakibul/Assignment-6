import express from 'express';
import { ProductRoutes } from '../modules/product/product.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/auth', UserAuthRoutes);

export default router;
