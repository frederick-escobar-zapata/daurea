// src/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const featuredProducts = [
    {
      id: '1',
      name: 'Anillo de Plata & Circón',
      price: 45000,
      material: 'Plata 925',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      name: 'Collar de Plata Perla',
      price: 32000,
      material: 'Plata 925',
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      name: 'Aros de Acero Quirúrgico',
      price: 28000,
      material: 'Acero Quirúrgico 316L',
      imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div>
      {/* BANNER PRINCIPAL: IMAGEN OFICIAL LIMPIA */}
      <section className="container-fluid p-0 bg-light text-center">
        <div className="home-hero-image-wrap w-100 overflow-hidden">
          <img 
            src="/hero-banner.png" 
            alt="D'Áurea Joyas & Accesorios - Colección Exclusiva" 
            className="home-hero-image w-100 h-auto object-fit-cover shadow-sm"
          />
        </div>
      </section>

      {/* SECCIÓN PRODUCTOS DESTACADOS */}
      <section className="container py-5 mt-4">
        <div className="text-center mb-5">
          <h2 className="font-serif fw-bold text-daurea-espresso mb-2">Destacados de la Temporada</h2>
          <p className="text-muted">Piezas seleccionadas con el sello de calidad D&apos;Áurea.</p>
        </div>

        <div className="row g-4">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="col-12 col-md-4">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
                <div className="featured-product-image-wrap">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name} 
                    className="featured-product-image w-100 object-fit-cover"
                  />
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <span className="small text-uppercase text-muted d-block mb-1">{prod.material}</span>
                    <h5 className="font-serif fw-bold text-daurea-espresso mb-2">{prod.name}</h5>
                    <p className="text-daurea-gold fw-bold fs-5 mb-3">${prod.price.toLocaleString('es-CL')}</p>
                  </div>
                  <Link 
                    href={`/producto/${prod.id}`} 
                    className="btn btn-dark featured-product-button w-100 py-2 fw-semibold text-uppercase text-decoration-none text-center"
                  >
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}