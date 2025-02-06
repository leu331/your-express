import { Router } from "express";
import { DeliveryLogsController } from "@/controllers/deliveryLogsController";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";

const deliveryLogsController = new DeliveryLogsController

const deliveryLogsRoutes = Router()

deliveryLogsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization(["sale"]), deliveryLogsController.create)

deliveryLogsRoutes.get("/:delivery_id/show", ensureAuthenticated, verifyUserAuthorization(["sale", "customer"]), deliveryLogsController.show)

export {deliveryLogsRoutes}