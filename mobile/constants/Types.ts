export interface userType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  block: boolean;
  avatar: string;
  lastMessage?: string;
}
