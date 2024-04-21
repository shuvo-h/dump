import dotenv from 'dotenv'
import path from 'path'

// initialize dotenv
const currentWorkingDir = process.cwd()
const envFilePath = path.join(currentWorkingDir, '.env')
dotenv.config({
  path: envFilePath,
})

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

// env list
export const envInfo = {
  //   node_env: process.env.NODE_ENV,
  //   frontend_base_url: process.env.FRONTEND_BASE_URL,
  //   frontend_base_production_url: process.env.FRONTEND_BASE_PRODUCTION_URL,
  PORT: process.env.PORT || 5001,
  db: {
    DB_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
  },
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET, // console.log(require("crypto").randomBytes(64).toString('hex'));
    JWT_ACCESS_TOKEN_EXPIRE_IN: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
    JWT_REFRESH_TOKEN_EXPIRE_IN: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
  },
  COOKIES: {
    COOKIE_SIGNATURE_SECRET: process.env.COOKIE_SIGNATURE_SECRET,
    COOKIES_ALLOWED_SUB_DOMAIN: isProduction
      ? process.env.COOKIES_ALLOWED_SUB_DOMAIN
      : 'localhost',
  },
}
