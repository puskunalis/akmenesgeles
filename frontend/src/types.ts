export interface Product {
  isNew: boolean;
  imageURL: string;
  name: string;
  price: number;
  rating: number;
  numReviews: number;
}

export interface Item {
  id: string,
  imageUrl: string,
  title: string,
  description: string,
  price: number,
  categories?: Category[]
}

export interface Category {
  id: string,
  name: string,
  description: string,
  items: Item[]
}