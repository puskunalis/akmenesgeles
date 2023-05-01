export interface Item {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: Item[];
}
