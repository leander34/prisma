import { Request, Response } from 'express'
import { resolve } from 'path'
import { prismaClient } from '../database/prismaClient'

export class CreateProductCategoryController {
    async handle(request: Request, response: Response) {
        const { id_product, id_category } = request.body

        const productCategory = await prismaClient.productCategory.create({
            data: {
                id_product,
                id_category
            }
        })

        return response.json(productCategory)
    }

    async createProductAndCategory(request: Request, response: Response) {
        const { nameProduct, nameCategory, price, bar_code } = request.body

        const category = await prismaClient.productCategory.create({
            data: {
                product: {
                    create: {
                        bar_code,
                        name: nameProduct,
                        price
                    }
                },
                category: {
                    create: {
                        name: nameCategory
                    }
                }

            }
        })

        return response.json(category)
    }
}