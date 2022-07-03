import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'

export class FindCategory {
    async handle(req: Request, res: Response) {
        const { id } = req.params 

        const category = await prismaClient.category.findFirst({
            where: {
                id
            },
            include: {
                ProductCategory: {
                    select: {
                        product: {
                            select: {
                                name: true,
                                bar_code: true,
                                price: true
                            }
                        }
                    }
                }
            }
        })

        res.json(category)
    }
}