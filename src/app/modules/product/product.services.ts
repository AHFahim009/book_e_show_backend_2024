import mongoose from "mongoose"
import { TProduct } from "../interface"
import { ProductModel } from "./product.model"
import { AppError } from "../../errorHandle/AppError"
import { sendCloudinary } from "../../utils/sendCloudinary"
import QueryBuilder from "../../builder/QueryBuilder"
import { searchableField } from "../../constantType"


const createProduct = async (photo: any, payload: TProduct) => {
  console.log(payload, photo);


  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (!photo) {
      throw new AppError(404, "Product photo must be required");
    }

    const imgName = `${payload.name}_${payload.authorName}`.toLowerCase().trim()
    const path = photo.path
    const imageHost = await sendCloudinary(imgName, path)
    payload.photo = imageHost.secure_url as string
    const result = await ProductModel.create(payload)

    await session.commitTransaction()
    await session.endSession()

    return result


  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}
const latestProducts = async () => {
  const products = await ProductModel.find().sort({ publishedData: -1 }).limit(5)
  return products
}

const getProductCategories = async () => {
  const products = await ProductModel.find().distinct("category")
  return products
}

const getSingleProduct = async (id: string) => {
  const products = await ProductModel.findById(id)
  return products
}
const getAllProducts = async () => {
  const products = await ProductModel.find()
  return products
}

const deleteProduct = async (_id: string) => {
  const products = await ProductModel.deleteOne({ _id })
  return products
}



const updateProduct = async (_id: string, photo: any, payload: Partial<TProduct>) => {
  const product = await ProductModel.findById(_id)
  if (!product) throw new AppError(404, "Product doesn't exit");

  if (photo) {
    const imgName = `${product.name}_${product.authorName}`.toLowerCase().trim()
    const path = photo.path
    const imageHost = await sendCloudinary(imgName, path)
    payload.photo = imageHost.secure_url as string
  }

  const result = await ProductModel.findByIdAndUpdate({ _id }, payload, { new: true })
  return result

}

const searchingProducts = async (queryField: Record<string, unknown>) => {

  const productQuery = new QueryBuilder(ProductModel.find(), queryField)
    .search(searchableField)
    .filter()
    .sort()
    .pagination()
  const result = await productQuery.model
  const meta = await productQuery.countTotal()

  return {
    meta,
    result
  }

}






export const ProductServices = {
  createProduct,
  latestProducts,
  getProductCategories,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchingProducts,
}