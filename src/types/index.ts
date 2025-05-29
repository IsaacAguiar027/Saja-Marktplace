export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  images: string[];
  location: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
  updatedAt: string;
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  negotiable: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: { id: string; name: string }[];
}

export interface Message {
  id: string;
  listingId: string;
  listingTitle: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location?: string;
  memberSince: string;
  totalListings: number;
  rating?: number;
}