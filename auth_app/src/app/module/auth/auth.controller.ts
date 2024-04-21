import httpStatus from 'http-status'
import { envInfo, isProduction } from '../../config/config'
import { ExpressMiddleware } from '../../interface'
import { catchAsync } from '../../utils/catchAsync'
import { sendRes } from '../../utils/sendRes'
import { AuthServices } from './auth.service'
import { COOKIES_INFO } from './auth.constant'

const createUser: ExpressMiddleware = async (req, res) => {
  const { accessToken, refreshToken, user } = await AuthServices.createUser(
    req.body,
  )

  // do login to this new user
  res.cookie('accessToken', accessToken, {
    maxAge: COOKIES_INFO.MAX_AGE_ACCESS_TOKEN_MINUTE * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    signed: true,
    domain: envInfo.COOKIES.COOKIES_ALLOWED_SUB_DOMAIN, //'.bbl.com',
    sameSite: 'strict',
  })
  res.cookie('refreshToken', refreshToken, {
    maxAge: COOKIES_INFO.MAX_AGE_REFRESH_TOKEN_MINUTE * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    signed: true,
    domain: envInfo.COOKIES.COOKIES_ALLOWED_SUB_DOMAIN, //'.bbl.com',
    sameSite: 'strict',
  })

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registration successful',
    data: { accessToken, user },
  })
}
const loginUser: ExpressMiddleware = async (req, res) => {
  const { accessToken, refreshToken, user } = await AuthServices.loginUser(
    req.body,
  )

  // do login to this new user

  res.cookie('refreshToken', refreshToken, {
    maxAge: COOKIES_INFO.MAX_AGE_REFRESH_TOKEN_MINUTE * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    signed: true,
    domain: envInfo.COOKIES.COOKIES_ALLOWED_SUB_DOMAIN, //'.bbl.com',
    sameSite: 'strict',
  })
  res.cookie('accessToken', accessToken, {
    maxAge: COOKIES_INFO.MAX_AGE_ACCESS_TOKEN_MINUTE * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    signed: true,
    domain: envInfo.COOKIES.COOKIES_ALLOWED_SUB_DOMAIN, //'.bbl.com',
    sameSite: 'strict',
  })
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: { accessToken, user },
  })
}
const createRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.signedCookies
  const { accessToken } =
    await AuthServices.createRefreshTokenByJwt(refreshToken)

  res.cookie('accessToken', accessToken, {
    maxAge: COOKIES_INFO.MAX_AGE_ACCESS_TOKEN_MINUTE * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    signed: true,
    domain: envInfo.COOKIES.COOKIES_ALLOWED_SUB_DOMAIN, //'.bbl.com',
    sameSite: 'strict',
  })
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access toke is retrived successfully',
    data: { 
      accessToken ,
      requestBy:{
        requestedOrigin: req.headers.origin || null,
        host: req.headers.host,
        userAgnet: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress,
        // || req.connection.socket.remoteAddress;
      }
    },
  })
})

export const AuthControllers = {
  createUser: catchAsync(createUser),
  loginUser: catchAsync(loginUser),
  createRefreshToken: catchAsync(createRefreshToken),
}
