import {Request, Response, NextFunction} from "express"
import {prisma} from "../database/prisma"
import {z} from "zod"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import {sign} from "jsonwebtoken"
import {authConfig} from "@/configs/auth"

export class SessionController {
    async create(request:Request, response:Response, next:NextFunction): Promise <void>{
        const bodySchema = z.object({
           email: z.string().email(),
           password: z.string().min(8, "A senha precisa ter, no mínimo 8 caracteres.")
        })

        const {email, password} = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: {email}
        })

        if(!user) {
            throw new AppError("Crendenciais inválidas.", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched) {
            throw new AppError("Crendenciais inválidas.", 401)
        }

        const {secret, expiresIn} = authConfig.jwt

        console.log(secret)
        console.log("JWT Secret:", authConfig.jwt.secret);

        if (typeof secret === "string") {
            console.log("JWT secret is not a string!");
        
          }

        const token = sign(
            {role: user.role ?? "customer", },
             secret as string,
            {
            subject: user.id,
            expiresIn: "1d"  })

        response.json({Token: token, user: user})
        }
    }
