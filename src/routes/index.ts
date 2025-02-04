import { userRoutes } from "./userRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { Router } from "express";

const routes = Router()

routes.use("/user", userRoutes)
routes.use("/session", sessionRoutes)

export {routes}

