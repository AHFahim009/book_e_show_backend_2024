import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router()

router.post("/", AuthControllers.login)



export const AuthRoutes = router