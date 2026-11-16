// src/actions/products.ts
'use server'

import { prisma } from '@/lib/prisma'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        material: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    return []
  }
}