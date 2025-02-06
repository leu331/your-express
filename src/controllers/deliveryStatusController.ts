import { Request, Response, NextFunction } from "express";
import {z} from "zod"
import {prisma} from "../database/prisma"
import { AppError } from "@/utils/AppError";

export class DeliveryStatusController {
    async update(request: Request, response: Response, next: NextFunction): Promise<void>{
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered"])
        })

        const {id} = paramsSchema.parse(request.params)
        const {status} = bodySchema.parse(request.body)

        const existingDelivery = await prisma.delivery.findUnique({
            where: {id}
        })

        if(!existingDelivery) {
            throw new AppError("Encomenda não encontrada", 400)
        }

        if (existingDelivery.status === status) {
            throw new AppError("O status já está atualizado", 400);
        }

        await prisma.delivery.update({
            data: {
                status,
                updatedAt: new Date
            },
            where: {
                id,
            },
        })

        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: status
            }
        })

        response.json({message: "Atualizado"})
    
    }
}