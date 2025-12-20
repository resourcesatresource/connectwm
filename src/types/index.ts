export interface Connection {
  _id: string;
  name: string;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDetails {
  _id: string;
  name: string;
  isGold: boolean;
  userId: string;
  connections: Connection[];
}
