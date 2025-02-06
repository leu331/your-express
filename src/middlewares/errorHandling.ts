import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });

    } else if (error instanceof ZodError) {
        response.status(400).json({ message: "Erro de validação.", issues: error.format() });

    } else {
        console.error(error);
        response.status(500).json({ message: "Erro interno do servidor" });
    }

};
