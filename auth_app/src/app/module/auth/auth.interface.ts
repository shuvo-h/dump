import { Types } from 'mongoose'
import { TUserRole, TUserStatus } from '../user/user.interface'

export type TLoginUser = {
  email: string
  password: string
}

export type TTokenUser = {
  id: Types.ObjectId
  email: string
  role: TUserRole
  status: TUserStatus
}
