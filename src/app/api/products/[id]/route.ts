// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }> | { id: string };
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const params = await Promise.resolve(context.params);
    const idParam = params.id;

    const product = await prisma.product.findUnique({
      where: { id: idParam },
      include: {
        category: true,
        material: true,
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const formattedProduct = {
      ...product,
      images: product.images.length > 0
        ? product.images 
        : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop']
    };

    return NextResponse.json(formattedProduct, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error al obtener el producto:', error);
    return NextResponse.json({ error: 'Error interno', details: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const params = await Promise.resolve(context.params);
    const idParam = params.id;
    const body = await request.json();
    const { name, description, price, stock, material, category, imageUrl } = body;

    const updatedProduct = await prisma.product.update({
      where: { id: idParam },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'],
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category, slug: category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-') }
          }
        },
        material: {
          connectOrCreate: {
            where: { name: material },
            create: { name: material }
          }
        }
      },
      include: { category: true, material: true }
    });

    return NextResponse.json(updatedProduct);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: 'Error al actualizar', details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const params = await Promise.resolve(context.params);
    const idParam = params.id;
    await prisma.product.delete({ where: { id: idParam } });
    return NextResponse.json({ message: 'Eliminado correctamente' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: 'Error al eliminar', details: errorMessage }, { status: 500 });
  }
}