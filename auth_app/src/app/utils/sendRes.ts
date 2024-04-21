import { Response } from 'express'

type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  data: T
  meta?: {
    page: number
    limit: number
    count: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export const sendRes = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data || null,
    meta: data.meta || null,
  })
}
