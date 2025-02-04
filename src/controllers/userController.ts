import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import {hash} from "bcrypt"
import {prisma} from "../../prisma"
import { UserRole } from "@prisma/client";

export class UserController {
    async create(request: Request, response: Response, next: NextFunction ): Promise<void> {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email().trim(),
            password: z.string().min(8, "A senha precisa ter, no mínimo, 8 caracteres.").trim()
        })

        const {name, email, password} = bodySchema.parse(request.body)

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
           data: {
            name,
            email,
            password: hashedPassword
           }

        })

        const {password: _, ...userWithoutPassword} = user

        response.status(201).json({userWithoutPassword})
    }
}

