import {Request, Response, NextFunction} from "express"
import { prisma } from "../database/prisma"
import {z} from "zod"

export class DeliveriesController {
    async create (request:Request, response: Response, next:NextFunction): Promise<void>{
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string()
        })

        const {user_id, description} = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.create({
            data: {
                userId: user_id,
                description 

            }
        })
        response.status(201).json({Entrega: delivery})
    }

    async index (request:Request, response: Response, next:NextFunction): Promise<void>{
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: {select: {name: true, email: true}}
            }
        })

        response.json(deliveries)
    }

    async show (request:Request, response: Response, next:NextFunction): Promise<void>{
        const {id} = request.params

        const deliveryById = await prisma.delivery.findUnique({
            where: {id}
        })
        if (!deliveryById) {
            response.json({mensagem: "Entrega não encontrada"})
        }

        response.json(deliveryById)
    }

    async update (request:Request, response: Response, next:NextFunction): Promise<void>{
        const {id} = request.params

        const {status} = request.body
        await prisma.delivery.update({
            where: {id}, data: {
                status
            }
        })

        const deliveryUpdated = await prisma.delivery.findUnique({
            where: {id}
        })

        response.json({Atualização: deliveryUpdated})
    }
}