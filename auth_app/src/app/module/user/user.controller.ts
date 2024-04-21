import express from 'express'
// import { USER_ROLE } from '../user/user.constant';
// import { validateRequest } from '../../middlewares/validateRequest';
// import { salesOrderValidation } from './salesorder.validation';
// import { SalesOrderControllers } from './salesorder.controller';
// import { authCheck } from '../../middlewares/authCheck';

export const userRouter = express.Router()

userRouter.post(
  '/',
  //   authCheck(USER_ROLE.USER, USER_ROLE.Manager),
  //   validateRequest(salesOrderValidation.salesOrderCreateValidationSchema),
  //   userControllers.createSaleOrder,
)

userRouter.get(
  '/me',
  //   authCheck(USER_ROLE.USER, USER_ROLE.Manager),
  //   SalesOrderControllers.getSalesQuantity,
)
