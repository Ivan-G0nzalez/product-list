import { ID } from './helper.interface';
import { Response } from './helper.interface';

export interface Product {
  id?: ID;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  image: string;
  autor: ID;
}

export type ProductQueryResponse = Response<Array<Product>>;
