import { myCache } from "../../../app";
import { eligibleQuery } from "../../constantType";
import catchAsync from "../../utils/catchAsync";
import { queryPicker } from "../../utils/queryPicker";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.services";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProduct(req.file, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Product created successfully",
    data: result,
  });
});

const latestProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.latestProducts();
  const responseData = {
    statusCode: 200,
    message: "Latest product created successfully",
    data: result,
  };
  myCache.set(req.originalUrl, responseData);
  sendResponse(res, responseData);
});

const getProductCategories = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductCategories();
  const responseData = {
    statusCode: 200,
    message: "product categories retrieved successfully",
    data: result,
  };
  myCache.set(req.originalUrl, responseData);
  sendResponse(res, responseData);
});

const updateProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await ProductServices.updateProduct(_id, req.file, req.body);
  sendResponse(res, {
    statusCode: 200,
    message: "Latest product created successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await ProductServices.getSingleProduct(_id);
  const responseData = {
    statusCode: 200,
    message: "Single product retrieved successfully",
    data: result,
  };
  myCache.set(req.originalUrl, responseData);

  sendResponse(res, responseData);
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProducts();

  const responseData = {
    statusCode: 200,
    message: "All products retrieved successfully",
    data: result,
  };

  // store response data in cache memory
  myCache.set(req.originalUrl, responseData);
  sendResponse(res, responseData);
});

const deleteProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await ProductServices.deleteProduct(_id);

  sendResponse(res, {
    statusCode: 200,
    message: "Product deleted successfully",
    data: result,
  });
});

const searchingProducts = catchAsync(async (req, res) => {
  const refileQuery = queryPicker(req.query, eligibleQuery);
  const result = await ProductServices.searchingProducts(refileQuery);

  sendResponse(res, {
    statusCode: 200,
    message: "Searching result...........",
    meta: result.meta,
    data: result.result,
  });
});

export const ProductControllers = {
  createProduct,
  latestProducts,
  getProductCategories,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  getAllProducts,
  searchingProducts,
};
