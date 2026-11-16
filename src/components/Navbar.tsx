// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-daurea sticky-top shadow-sm py-3">
      <div className="container">
        {/* LOGO CORPORATIVO */}
        <Link href="/" className="navbar-brand font-serif fw-bold fs-3 text-decoration-none text-daurea-espresso">
          D&apos;ÁUREA <span className="fs-6 fw-normal text-muted d-none d-sm-inline">JOYAS & ACCESORIOS</span>
        </Link>

        {/* BOTÓN HAMBURGUESA MÓVIL */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ENLACES DE NAVEGACIÓN */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
            <li className="nav-item">
              <Link href="/" className="nav-link fw-semibold text-daurea-espresso">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/tienda" className="nav-link fw-semibold text-daurea-espresso">
                Catálogo
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/nosotros" className="nav-link fw-semibold text-daurea-espresso">
                Nosotros
              </Link>
            </li>
          </ul>

          {/* ICONOS DE ACCESO RÁPIDO */}
          <div className="d-flex align-items-center justify-content-center gap-3 mt-3 mt-lg-0">
            <Link href="/tienda" className="text-dark p-2 text-decoration-none" title="Buscar productos">
              <i className="bi bi-search fs-5"></i>
            </Link>

            <Link href="/favoritos" className="position-relative text-dark p-2 text-decoration-none" title="Favoritos">
              <i className="bi bi-heart fs-5"></i>
              {mounted && wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill fw-bold shadow-sm badge-daurea-gold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/admin" className="text-dark p-2 text-decoration-none" title="Panel Administrativo">
              <i className="bi bi-person fs-5"></i>
            </Link>

            <Link 
              href="/carrito" 
              className="navbar-cart-button position-relative d-flex align-items-center justify-content-center text-decoration-none shadow-sm bg-daurea-cream text-daurea-espresso rounded-circle"
              title="Ver Carrito de Compras"
            >
              <i className="bi bi-bag fs-5"></i>
              {mounted && totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill fw-bold shadow-sm badge-daurea-gold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}