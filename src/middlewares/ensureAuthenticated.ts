import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
    role: string;
    sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        // Passa o erro para o middleware de erro
        return next(new AppError("Token JWT não encontrado", 401));
    }

    try {
        const [, token] = authHeader.split(" ");
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload;

        request.user = { id: user_id, role };
        return next();
    } catch (error) {
        // Passa o erro para o middleware de erro
        return next(new AppError("Token inválido", 401));
    }
}

export { ensureAuthenticated };
