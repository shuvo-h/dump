import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import { catchAsync } from '../utils/catchAsync'

export const validateRequest = (zodDataSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.signedCookies);
    await zodDataSchema.parseAsync({
      body: req.body,
      cookies: req.signedCookies,
    })
    next()
  })
}
