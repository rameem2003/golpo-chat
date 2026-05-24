export interface userType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isVerified: boolean;
  block: boolean;
  avatar: string;
}

export interface AuthContextType {
  user: userType | null;
  loading: boolean;
  msg: string | null;
  login: (email: string, password: string) => Promise<void>;
  updateUser: (
    name: string,
    email: string,
    address: string,
    phone: string,
  ) => Promise<void | null>;
  updatePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => Promise<void | null>;
  verifyEmail: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetPasswordToken: (token: string) => Promise<boolean>;
  passwordReset: (
    token: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void | null>;
}
