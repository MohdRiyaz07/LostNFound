export interface User {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  reportedBy: User;
  reportedAt: Date;
  status: 'pending' | 'collected';
  contactNumber: string;
}

export interface RewardHistory {
  id: string;
  userId: string;
  points: number;
  description: string;
  date: Date;
}