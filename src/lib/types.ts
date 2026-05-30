export type PropertyStatus = "for-sale" | "for-rent" | "sold" | "pending";
export type PropertyType = "house" | "apartment" | "villa" | "townhouse" | "studio";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  deals: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  city: string;
  address: string;
  beds: number;
  baths: number;
  area: number; // sqft
  image: string;
  featured: boolean;
  agentId: string;
  createdAt: string;
  // signals used by the recommendation engine
  tags: string[];
}

export interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "contacted" | "booked" | "closed";
  createdAt: string;
}
