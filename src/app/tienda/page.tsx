// src/app/tienda/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWishlist, type WishlistItem } from '@/context/WishlistContext';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Material {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  category: Category;
  material: Material;
}

export default function TiendaPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let isMounted = true;

    const fetchTiendaData = async () => {
      try {
       setLoading(true);
        // Apuntando correctamente a tu backend de Express (puerto 4000) o ruta correspondiente
        const [resCat, resProd] = await Promise.all([
  fetch('/api/categories'),
  fetch('/api/products')
]);

        const dataCat = await resCat.json();
        const dataProd = await resProd.json();

        if (isMounted) {
          setCategories(Array.isArray(dataCat) ? dataCat : []);
          setProducts(Array.isArray(dataProd) ? dataProd : []);
        }
      } catch (error) {
        console.error("Error al conectar con la tienda de D'ÁUREA:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTiendaData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category?.id === selectedCategory)
    : products;

  if (loading) {
    return (
      <div className="text-center py-5 text-daurea-espresso fs-5 fw-semibold">
        Cargando tienda D'ÁUREA... 💍
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Cabecera corporativa */}
      <header className="text-center mb-5">
        <h1 className="catalog-title font-serif fw-bold mb-2 text-daurea-espresso">
          D'ÁUREA 💍
        </h1>
        <p className="text-muted fs-6">Catálogo oficial de joyería en Plata 925 y Acero Quirúrgico</p>
      </header>

      {/* Barra de Filtros por Categorías */}
      <div className="d-flex gap-2 justify-content-center mb-5 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`btn rounded-pill px-4 py-2 fw-medium transition ${
            selectedCategory === null ? 'btn-dark bg-daurea-espresso border-0' : 'btn-outline-dark'
          }`}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`btn rounded-pill px-4 py-2 fw-medium transition ${
              selectedCategory === cat.id ? 'btn-dark bg-daurea-espresso border-0' : 'btn-outline-dark'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grilla de Productos */}
      <div className="row g-4">
        {filteredProducts.map((prod) => {
          const isFavorite = isInWishlist(prod.id);
          
          const wishItem: WishlistItem = {
            id: prod.id,
            name: prod.name,
            price: prod.price,
            material: prod.material?.name || 'Joyería D\'Áurea',
            imageUrl: prod.images?.[0]?.trim() || ''
          };

          return (
            <div key={prod.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-white d-flex flex-column justify-content-between">
                
                {/* Imagen del Producto */}
                {prod.images?.[0]?.trim() && (
                  <div className="catalog-product-image-wrap bg-light position-relative">
                    <img
                      src={prod.images[0].trim()}
                      alt={prod.name}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                )}

                {/* Contenido de la Tarjeta */}
                <div className="card-body d-flex flex-column p-4">
                  <div className="catalog-product-meta small text-uppercase tracking-wider text-muted fw-bold mb-2">
                    {prod.category?.name} • {prod.material?.name}
                  </div>
                  <h3 className="card-title h5 fw-bold text-daurea-espresso mb-2">
                    {prod.name}
                  </h3>
                  <p className="catalog-product-description card-text text-muted small flex-grow-1 mb-4">
                    {prod.description || 'Sin descripción disponible.'}
                  </p>

                  {/* Sección Inferior: Precio y Acciones */}
                  <div className="border-top pt-3 mt-auto">
                    <div className="h5 fw-bold text-daurea-espresso mb-3">
                      ${prod.price.toLocaleString('es-CL')}
                    </div>
                    
                    <div className="d-flex gap-2 align-items-center">
                      <Link
                        href={`/producto/${prod.id}`}
                        className="btn btn-daurea-gold catalog-product-button flex-grow-1 py-2 text-uppercase text-decoration-none text-center"
                      >
                        Ver Detalle
                      </Link>

                      {/* Botón de Favorito */}
                      <button
                        onClick={() => toggleWishlist(wishItem)}
                        className={`btn favorite-toggle-button catalog-favorite-button d-flex align-items-center justify-content-center p-0 rounded-2 ${
                          isFavorite ? 'is-active' : ''
                        }`}
                        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                      >
                        <svg
                          className="favorite-toggle-icon"
                          viewBox="0 0 24 24"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-5 text-muted">
          No hay productos disponibles en esta categoría.
        </div>
      )}
    </div>
  );
}