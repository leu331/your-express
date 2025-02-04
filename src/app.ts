import express, { ErrorRequestHandler } from "express";
import "express-async-errors"

import { errorHandling } from "@/middlewares/errorHandling";
import { routes } from "./routes";

const app = express()

app.use(express.json())

app.use(routes)
app.use(errorHandling as ErrorRequestHandler)

export {app}