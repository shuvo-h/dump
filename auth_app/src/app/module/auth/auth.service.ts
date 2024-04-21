import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { USER_ROLE, USER_STATUS } from '../user/user.constant'
import { TUser } from '../user/user.interface'
import { UserModel } from '../user/user.model'
import { TLoginUser, TTokenUser } from './auth.interface'
import { envInfo } from '../../config/config'
import { createJwtToken, verifyJwtToken } from './auth.utils'

const createUser = async (payload: TUser) => {
  // chekc if email is not exist
  const existUser = await UserModel.exists({ email: payload.email })
  if (existUser) {
    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, `email already exist`)
  }

  const newUser: Partial<TUser> = {}

  newUser.email = payload.email
  newUser.password = payload.password
  newUser.role = USER_ROLE.USER
  newUser.status = USER_STATUS.ACTIVE
  newUser.isDeleted = false

  const user = await UserModel.create(newUser)

  const tokenUser: TTokenUser = {
    id: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
  }

  // access granted: accessToken, refreshToken

  const accessToken = createJwtToken(
    tokenUser,
    envInfo.jwt.JWT_ACCESS_SECRET as string,
    envInfo.jwt.JWT_ACCESS_TOKEN_EXPIRE_IN as string,
  )
  const refreshToken = createJwtToken(
    tokenUser,
    envInfo.jwt.JWT_REFRESH_SECRET as string,
    envInfo.jwt.JWT_REFRESH_TOKEN_EXPIRE_IN as string,
  )

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  }
}

const loginUser = async (payload: TLoginUser) => {
  // check if user exist using static method
  const user = await UserModel.findOne({ email: payload.email }).select(
    '+password',
  ) // tell with "+" sign to select password since in schema we have used {select:0}

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `Email and password doesn't match`)
  }
  // check if user is not deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `User is already deleted`)
  }
  // check if user is not blocked
  if (user.status === USER_STATUS.SUSPENDED) {
    throw new AppError(httpStatus.FORBIDDEN, `User is suspended`)
  }

  // check if the password match
  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload.password,
    user.password,
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Invalid user email or password!`)
  }
  const tokenUser: TTokenUser = {
    id: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
  }

  // access granted: accessToken, refreshToken

  const accessToken = createJwtToken(
    tokenUser,
    envInfo.jwt.JWT_ACCESS_SECRET as string,
    envInfo.jwt.JWT_ACCESS_TOKEN_EXPIRE_IN as string,
  )
  const refreshToken = createJwtToken(
    tokenUser,
    envInfo.jwt.JWT_REFRESH_SECRET as string,
    envInfo.jwt.JWT_REFRESH_TOKEN_EXPIRE_IN as string,
  )

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  }
}

const createRefreshTokenByJwt = async (refreshToken: string) => {
  // check if token is valid
  const decoded = verifyJwtToken(
    refreshToken,
    envInfo.jwt.JWT_REFRESH_SECRET as string,
  )
  const { id, iat } = decoded

  // check if a vaild user
  const user = await UserModel.findById(id).select('+password') // tell with "+" sign to select password since in schema we have used password:{select:0}; the +sign return doc with other rest of the properties.

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `User doesn't exist`)
  }
  // check if user is not deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `User is already deleted`)
  }
  // check if user is not deleted
  if (user.status === USER_STATUS.SUSPENDED) {
    throw new AppError(httpStatus.FORBIDDEN, `User is already suspended`)
  }

  // check if password is not changed after issued the token
  if (user.passwordChangedAt) {
    const isTokenIssuedBeforePasswordChanged =
      UserModel.isJwtIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    if (isTokenIssuedBeforePasswordChanged) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Invalid Token, Please login again!`,
      )
    }
  }

  const tokenUser: TTokenUser = {
    id: user._id,
    email: user.email,
    role: user.role,
    status: user.status,
  }
  // access granted: accessToken, refreshToken

  const accessToken = createJwtToken(
    tokenUser,
    envInfo.jwt.JWT_ACCESS_SECRET as string,
    envInfo.jwt.JWT_REFRESH_TOKEN_EXPIRE_IN as string,
  )

  return {
    accessToken,
  }
}

export const AuthServices = {
  createUser,
  loginUser,
  createRefreshTokenByJwt,
}
