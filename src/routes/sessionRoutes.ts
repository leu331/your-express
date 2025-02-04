import { Router } from "express";
import { SessionController } from "@/controllers/sessionController";

const sessionController = new SessionController

const sessionRoutes = Router()

sessionRoutes.post("/", sessionController.create)

export {sessionRoutes}