export interface Product {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  description: string;
  image: string;
  categorySlug: string;
  categoryName: string;
  badge?: string | null;
  isPopular?: boolean;
}

export interface ComboItem {
  id: string;
  title: string;
  description: string;
  price: string;
  rawPrice: number;
  tag: string;
  image: string;
  link: string;
  badge?: string | null;
}

export interface Category {
  name: string;
  slug: string;
  iconName: string;
  totalItems: number;
}

export interface CartItem {
  product: Product | ComboItem;
  quantity: number;
  observation?: string;
}

export interface StoreInfo {
  name: string;
  city: string;
  address: string;
  phones: string[];
  whatsapp: string;
  whatsappFormatted: string;
  hours: string[];
  isOpen: boolean;
}
