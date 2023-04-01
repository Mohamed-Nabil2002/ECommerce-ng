export interface Cart {
  id: number | undefined;
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  quantity: number | undefined;
  userId: number;
  productId: number;
}
