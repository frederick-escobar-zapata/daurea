// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Patrón Singleton para evitar múltiples instancias de PrismaClient en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

interface CategoryType {
  id: string | number;
  name: string;
  slug?: string;
}

interface MaterialType {
  id: string | number;
  name: string;
}

interface ProductFromDB {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  images?: string[];
  category?: CategoryType;
  material?: MaterialType;
  createdAt?: Date;
}

// GET: Obtener todos los productos desde la Base de Datos de forma segura
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        material: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedProducts = products.map((p: ProductFromDB) => ({
      ...p,
      images: p.images && p.images.length > 0 
        ? p.images 
        : [p.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop']
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error('Error al obtener productos de la BD:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo producto desde el Panel Administrativo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, stock, material, category, imageUrl } = body;

    const slug = name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || '',
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
      include: {
        category: true,
        material: true
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error al crear el producto en la BD:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
}