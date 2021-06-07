declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
  }
}

enum UserRole {
  ADMIN = 'ADMIN',
  LEAD_GUIDE = 'LEAD_GUIDE',
  GUIDE = 'GUIDE',
  USER = 'USER',
  GUEST = 'GUEST',
}
