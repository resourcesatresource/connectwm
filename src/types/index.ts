export interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  isAdmin: boolean;
  profileImage?: string;
}

export interface Connection {
  _id: string;
  name: string;
  description: string;
  url: string;
  iconName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDetails {
  _id: string;
  name: string;
  isGold: boolean;
  userId: {
    _id: string;
    profileImage?: string;
  };
  connections: Connection[];
  createdAt: string;
}
