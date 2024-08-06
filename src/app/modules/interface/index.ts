import mongoose from "mongoose";

// first a user have to create his account by give the following information
export type TUser = {
  name: string;
  gender: "male" | "female";
  email: string;
  password: string;
  role: "user" | "admin";
  photo?: string;
  dataOfBirth: string;
  age?: number // virtual field....
}

// second a registered user give his following information prove him to authentic 
export type TAuth = {
  email: string;
  password: string
}


// only admin user can create products
//form data type .............
// product collection schema
export type TProduct = {
  name: string;
  authorName: string;
  publishedData: string;
  photo: string;
  price: number;
  stock: number;
  category: string
}

// now a authentic user can visit application where he can add any product to his cart and payment his order
// order type..............................
export type TOrdersItem = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: mongoose.Schema.Types.ObjectId // relation with product one to many
}

export type TShippingInfo = {
  address: string;
  city: string;
  country: string;
  pinCode: number;
}

// order  collection schema
export type TOrder = {
  shippingInfo: TShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered"
  ordersItem: TOrdersItem[];
  userId: mongoose.Schema.Types.ObjectId// relation with User one to one 
}

//coupon type.................
// if user has coupon code he can use coupon to get discount
export type TCoupon = {
  couponCode: string //unique
  discount: Number
}


// payment type

export type TPayment = {
  amount: number
}



