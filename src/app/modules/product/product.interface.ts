import { Model } from 'mongoose';


export type Review = {
    body: string;
  };

export type IProduct = {
  image: string;
  productName: string;
  category: string;
  status: 0 | 1;
  price: number;
  description: string;
  keyFeature: string;
  individualRating: number;
  averageRating: number;
  review?: Review[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductsFilters = {
  searchTerm?: string;
  category?: string;
};