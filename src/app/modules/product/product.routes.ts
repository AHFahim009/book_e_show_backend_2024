import { NextFunction, Request, Response, Router } from "express";
import { ProductControllers } from "./product.controllers";
import validationGuard from "../../middlewares/validationGuard";
import { ProductValidation } from "./product.validation";
import { singleFile } from "../../middlewares/multer";
import { USER_ROLE } from "../../constantType";
import cacheMemory from "../../middlewares/cacheMemory";
import invalidCache from "../../middlewares/invalidCache";


const router = Router()

router.post("/create-product",
  // authGuard(USER_ROLE.ADMIN, USER_ROLE.USER),
  invalidCache({ product: true, dashboardStats: true }),
  singleFile,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validationGuard(ProductValidation.schema),
  ProductControllers.createProduct
)

//  get all latest products route
router.get("/latest-products",
  cacheMemory(),
  ProductControllers.latestProducts
)

// get product categories route
router.get("/product-categories",
  cacheMemory(),
  ProductControllers.getProductCategories
)


//  get all products route
router.get('/get-all-products',
  cacheMemory(),
  ProductControllers.getAllProducts
)

// searching route
router.get("/",
  ProductControllers.searchingProducts
)
//  get single product
router.get("/:_id",
  cacheMemory(),
  ProductControllers.getSingleProduct
)

// update product route
router.put("/:_id",
  // authGuard(USER_ROLE.ADMIN,), // fix soon
  invalidCache({ product: true, dashboardStats: true }),
  singleFile,
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body && req.body.data) {
      req.body = JSON.parse(req.body.data)
    }
    next()
  },
  ProductControllers.updateProduct
)

//  delete product route
router.delete("/:_id",
  invalidCache({ product: true, dashboardStats: true }),
  ProductControllers.deleteProduct
)




export const ProductRoutes = router