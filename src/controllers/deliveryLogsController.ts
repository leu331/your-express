import {Request, Response} from "express"
import {z} from "zod"
import {prisma} from "../database/prisma"
import { AppError } from "@/utils/AppError"

export class DeliveryLogsController {
    async create(request: Request, response:Response): Promise <void> {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const {delivery_id, description} = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },

        })
        if (!delivery) {
            throw new AppError("Encomenda não encontrada", 404)
        }

        if (delivery.status === "processing" ) {
            throw new AppError("Mude o status da encomenda para 'shipped'", 404)
        }

        if(delivery.status === "delivered"){
            throw new AppError("O pedido já foi entregue", 404)
       
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description
            }
        })

        response.status(201).json()
    }
    async show(request: Request, response:Response): Promise <void> {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const {delivery_id} = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: {id: delivery_id},
            include: {
                logs: {select: {id:true, description: true, updatedAt: true}},
                user: {select: {id: true, name: true}}
            }

        })

        if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
            throw new AppError("O usuário pode ver apenas a sua própria encomenda", 401)
        }

        response.status(201).json(delivery)
    }
}