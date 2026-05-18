// Application-level user roles. Add a value here AND to the @Roles guard tests.
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export const USER_ROLES = Object.values(UserRole);
