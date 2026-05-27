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

export interface chatUserType {
  _id: string;
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

export interface FriendRequestReceiveType {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  receiver: string;
  status: string;
}

export interface FriendRequestSendType {
  _id: string;
  sender: string;
  receiver: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  status: string;
}

export interface FriendRequestContextType {
  search: any[]; // search result
  loading: boolean;
  msg: string;
  findFriend: (name: string) => void;
  receivedRequests: FriendRequestReceiveType[];

  sentRequests: FriendRequestSendType[];

  addSentRequest: (data: FriendRequestSendType) => void;

  addReceivedRequest: (data: FriendRequestReceiveType) => void;

  updateRequestStatus: (requestId: string, status: string) => void;

  removeReceivedRequest: (requestId: string) => void;
  fetchSentRequests: () => void;
  fetchReceivedRequests: () => void;
  friendRequest: (receiverId: string) => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;
  // rejectRequest: (requestId: string) => Promise<void>;
  // cancelRequest: (requestId: string) => Promise<void>;
}
