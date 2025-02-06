import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveriesController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveryStatusController } from "@/controllers/deliveryStatusController";

const deliveriesController = new DeliveriesController
const deliveryStatusController = new DeliveryStatusController

const deliveryRoutes = Router()

deliveryRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))

deliveryRoutes.post("/", deliveriesController.create)
deliveryRoutes.get("/", deliveriesController.index)
deliveryRoutes.get("/:id", deliveriesController.show)

deliveryRoutes.patch("/:id/status", deliveryStatusController.update)

export { deliveryRoutes}