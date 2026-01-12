
import { Country, Property } from './types';

export const COUNTRIES: Country[] = [
  { name: "Pakistan", code: "PK", emoji: "🇵🇰", continent: "Asia", currency: "PKR", phonePrefix: "+92" },
  { name: "United Arab Emirates", code: "AE", emoji: "🇦🇪", continent: "Asia", currency: "AED", phonePrefix: "+971" },
  { name: "United Kingdom", code: "GB", emoji: "🇬🇧", continent: "Europe", currency: "GBP", phonePrefix: "+44" },
  { name: "United States", code: "US", emoji: "🇺🇸", continent: "North America", currency: "USD", phonePrefix: "+1" },
  { name: "Saudi Arabia", code: "SA", emoji: "🇸🇦", continent: "Asia", currency: "SAR", phonePrefix: "+966" },
  { name: "India", code: "IN", emoji: "🇮🇳", continent: "Asia", currency: "INR", phonePrefix: "+91" },
  { name: "Canada", code: "CA", emoji: "🇨🇦", continent: "North America", currency: "CAD", phonePrefix: "+1" },
  { name: "Australia", code: "AU", emoji: "🇦🇺", continent: "Oceania", currency: "AUD", phonePrefix: "+61" },
  { name: "Turkey", code: "TR", emoji: "🇹🇷", continent: "Asia/Europe", currency: "TRY", phonePrefix: "+90" },
  { name: "Germany", code: "DE", emoji: "🇩🇪", continent: "Europe", currency: "EUR", phonePrefix: "+49" },
  { name: "France", code: "FR", emoji: "🇫🇷", continent: "Europe", currency: "EUR", phonePrefix: "+33" }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Sunset Villa',
    description: 'A stunning architectural masterpiece with panoramic ocean views.',
    price: 450,
    currency: 'USD',
    location: 'Malibu',
    city: 'Malibu',
    area: 'Pacific Heights',
    street: 'Sunset Blvd 101',
    country: 'United States',
    type: 'Villa',
    purpose: 'For Rent',
    bedrooms: 4,
    bathrooms: 3.5,
    hasGas: true,
    hasElectricity: true,
    phoneNumber: '123456789',
    whatsappNumber: '123456789',
    images: ['https://picsum.photos/seed/villa1/800/600', 'https://picsum.photos/seed/villa1b/800/600'],
    hostName: 'Sarah J.',
    rating: 4.9
  },
  {
    id: '2',
    title: 'Standard Town House',
    description: 'Nice living area with full utilities.',
    price: 85000,
    currency: 'PKR',
    location: 'Gulberg',
    city: 'Lahore',
    area: 'Block L',
    street: 'Main Blvd',
    country: 'Pakistan',
    type: 'House',
    purpose: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    hasGas: true,
    hasElectricity: true,
    phoneNumber: '03001234567',
    whatsappNumber: '03001234567',
    images: ['https://picsum.photos/seed/lhr1/800/600'],
    hostName: 'Alex Johnson',
    rating: 4.7
  }
];
