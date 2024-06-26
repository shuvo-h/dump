import express from 'express'
// import { authCheck } from '../../middlewares/authCheck';
import { validateRequest } from '../../middlewares/validateRequest'
// import { USER_ROLE } from '../user/user.constant';
import { AuthControllers } from './auth.controller'
import { AuthValidation } from './auth.validation'
export const authRouter = express.Router()

authRouter.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.createUser,
)

authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)

authRouter.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.createRefreshToken,
)
/*
authRouter.post(
  '/change-password',
  authCheck(USER_ROLE['super-admin'],USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
authRouter.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);
authRouter.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);
*/
