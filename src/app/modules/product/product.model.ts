import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    image: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    keyFeature: { type: String, required: true },
    individualRating: { type: Number, required: true },
    averageRating: { type: Number, required: true },
    review: [
      {
        body: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
