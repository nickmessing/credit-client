import { UserRole } from '@/generated/graphql'

export const readableRole = (role: UserRole): string =>
  role === UserRole.Admin ? 'Administrator' : role === UserRole.Manager ? 'Manager' : role
