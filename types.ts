
export interface Country {
  name: string;
  code: string;
  emoji: string;
  continent: string;
  currency: string;
  phonePrefix: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  city: string;
  area: string;
  street: string;
  country: string;
  type: string;
  purpose: 'For Rent' | 'For Sale';
  bedrooms: number;
  bathrooms: number;
  hasGas: boolean;
  hasElectricity: boolean;
  phoneNumber: string;
  whatsappNumber: string;
  images: string[];
  hostName: string;
  rating: number;
}

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  memberSince: string;
  listings: number;
  rating: number;
}
