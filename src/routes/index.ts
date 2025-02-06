import { userRoutes } from "./userRoutes";
import { sessionRoutes } from "./sessionRoutes";
import { deliveryRoutes } from "./deliveryRoutes";
import { deliveryLogsRoutes } from "./deliveryLogsRoutes";
import { Router } from "express";

const routes = Router()

routes.use("/user", userRoutes)
routes.use("/session", sessionRoutes)
routes.use("/delivery", deliveryRoutes)
routes.use("/delivery-logs", deliveryLogsRoutes)

export {routes}

