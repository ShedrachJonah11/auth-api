export interface UserRegisteredEvent {
  type: 'user.registered';
  userId: string;
  email: string;
  at: string;
}

export interface UserLoggedInEvent {
  type: 'user.logged_in';
  userId: string;
  email: string;
  at: string;
  ip?: string;
  userAgent?: string;
}

export interface PasswordResetRequestedEvent {
  type: 'auth.password_reset_requested';
  email: string;
  at: string;
}

export interface AccountLockedEvent {
  type: 'auth.account_locked';
  userId: string;
  email: string;
  lockUntil: string;
}

export type AuthEvent =
  | UserRegisteredEvent
  | UserLoggedInEvent
  | PasswordResetRequestedEvent
  | AccountLockedEvent;
