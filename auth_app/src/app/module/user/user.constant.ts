export const USER_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const // never change the value

export const USER_STATUS = {
  ACTIVE: 'active',
  RESTRICTED: 'restricted',
  TEMP_SUSPENDED: 'temp_suspended',
  SUSPENDED: 'suspended',
} as const
