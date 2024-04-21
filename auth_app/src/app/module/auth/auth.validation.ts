import { z } from 'zod'
const registerValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(4, { message: 'Password must be atleast 4 characters' })
      .max(20, { message: 'Password must not exceed 20 characters' })
      .refine(
        value => {
          return /^(?=.*[A-Z])(?=.*[a-z])/.test(value)
        },
        { message: 'Password must be atleast 1 uppercase and 1 lowercase' },
      ),
  }),
})
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    }),
  }),
})

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required!',
      invalid_type_error: 'Old password must be string',
    }),
    newPassword: z.string({
      required_error: 'New password is required!',
      invalid_type_error: 'New password must be string',
    }),
  }),
})
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      invalid_type_error: 'Refresh token must be string',
      required_error: 'Refresh token is required',
    }),
  }),
})
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: 'User id must be string',
      required_error: 'User id is required',
    }),
  }),
})
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: 'User id must be string',
      required_error: 'User id is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required!',
      invalid_type_error: 'New password must be string',
    }),
  }),
})

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
}
