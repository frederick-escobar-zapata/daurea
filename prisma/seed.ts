// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpiar datos previos opcionalmente
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.material.deleteMany()
  await prisma.user.deleteMany()

  // 1. Crear Categorías
  const anillos = await prisma.category.create({
    data: { name: 'Anillos', slug: 'anillos' },
  })
  const collares = await prisma.category.create({
    data: { name: 'Collares', slug: 'collares' },
  })
  const aros = await prisma.category.create({
    data: { name: 'Aros', slug: 'aros' },
  })
  const pulseras = await prisma.category.create({
    data: { name: 'Pulseras', slug: 'pulseras' },
  })

  // 2. Crear Materiales
  const acero = await prisma.material.create({
    data: { name: 'Acero Quirúrgico 316L' },
  })
  const plata = await prisma.material.create({
    data: { name: 'Plata 925' },
  })

  // 3. Crear Productos de prueba
  await prisma.product.createMany({
    data: [
      {
        name: 'Anillo Solitario Brillante',
        description: 'Hermoso anillo de plata 925 con circón central.',
        price: 24990,
        stock: 15,
        images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'],
        isFeatured: true,
        categoryId: anillos.id,
        materialId: plata.id,
      },
      {
        name: 'Collar Cadena Venezia',
        description: 'Collar de acero quirúrgico 316L hipoalergénico y resistente al agua.',
        price: 18990,
        stock: 20,
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'],
        isFeatured: true,
        categoryId: collares.id,
        materialId: acero.id,
      },
      {
        name: 'Aros Argollas Clásicas',
        description: 'Argollas de plata 925 livianas para uso diario.',
        price: 15990,
        stock: 25,
        images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80'],
        isFeatured: false,
        categoryId: aros.id,
        materialId: plata.id,
      },
      {
        name: 'Pulsera Es封lave Acero',
        description: 'Pulsera robusta de diseño moderno en acero quirúrgico.',
        price: 21990,
        stock: 10,
        images: ['https://images.unsplash.com/photo-1611591475753-c75c9d4d0399?auto=format&fit=crop&w=600&q=80'],
        isFeatured: true,
        categoryId: pulseras.id,
        materialId: acero.id,
      },
    ],
  })

  // 4. Crear un Usuario Administrador y un Cliente
  await prisma.user.create({
    data: {
      email: 'admin@daurea.cl',
      name: 'Administrador Daurea',
      password: 'hashed_password_secure', // En producción va encriptado
      role: 'ADMIN',
    },
  })

  await prisma.user.create({
    data: {
      email: 'cliente@correo.com',
      name: 'Cliente Prueba',
      password: 'hashed_password_secure',
      role: 'CUSTOMER',
    },
  })

  console.log('¡Base de datos poblada exitosamente con datos de prueba!')
}

main()
  .catch((e) => {
    console.error(e)
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })