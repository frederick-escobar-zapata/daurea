// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mockCategories = [
      { id: '1', name: 'Anillos', slug: 'anillos' },
      { id: '2', name: 'Collares', slug: 'collares' },
      { id: '3', name: 'Aros', slug: 'aros' },
      { id: '4', name: 'Pulseras', slug: 'pulseras' }
    ];

    return NextResponse.json(mockCategories, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    );
  }
}