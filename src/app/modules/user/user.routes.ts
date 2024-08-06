import { Router } from "express";
import { UserControllers } from "./user.controllers";
import { userValidation } from "./user.validation";
import validationGuard from "../../middlewares/validationGuard";
import invalidCache from "../../middlewares/invalidCache";

const router = Router()

router.post("/create-user",
  // validationGuard(userValidation.schema),
  invalidCache({ dashboardStats: true }),
  UserControllers.createUser
)

router.get("/",
  // authGuard("admin",), // todo:
  UserControllers.getAllUser
)
router.get("/:_id",
  UserControllers.singleUser
)
router.patch("/:_id",
  invalidCache({ dashboardStats: true }),
  UserControllers.updateUser
)


router.delete("/:_id",
  invalidCache({ dashboardStats: true }),
  UserControllers.deleteUser
)




export const UserRoutes = router