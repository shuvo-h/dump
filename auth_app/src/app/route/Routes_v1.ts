import express from 'express'
import { authRouter } from '../module/auth/auth.route'
// import { productRouter } from './../module/product/product.route';
// import { authRouter } from '../module/auth/auth.route';
// import { salesOrderRouter } from '../module/salesOrder/salesorder.route';

export const Routes_v1 = express.Router()

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  //   { path: '/products', route: productRouter },
  //   { path: '/sale-orders', route: salesOrderRouter },
]

moduleRoutes.forEach(routerEl => Routes_v1.use(routerEl.path, routerEl.route))
