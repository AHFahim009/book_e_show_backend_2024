import mongoose, { Schema } from "mongoose";
import { TProduct } from "../interface";


const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  authorName: { type: String, required: true },
  photo: { type: String, required: true },
  publishedData: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true, },
},
  {
    timestamps: true
  });




export const ProductModel = mongoose.model<TProduct>('Product', productSchema);

