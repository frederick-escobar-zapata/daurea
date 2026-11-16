// src/app/favoritos/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
// Asegúrate de que estas rutas de importación coincidan con la ubicación real de tus contextos y hooks
import { useWishlist, type WishlistItem } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function FavoritosPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      material: item.material,
      imageUrl: item.imageUrl
    });
    showToast(`"${item.name}" se ha movido al carrito.`);
  };

  return (
    <div className="page-surface py-5">
      <div className="container">
        
        <div className="text-center mb-5">
          <span className="badge wishlist-label text-uppercase mb-2 px-3 py-1 text-white">
            Tu Selección Personal
          </span>
          <h1 className="fw-bold text-uppercase text-dark font-serif">
            Lista de Deseos
          </h1>
          <p className="text-muted">
            Tus piezas favoritas en plata y acero quirúrgico guardadas en un solo lugar
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white text-center p-5 rounded-3 shadow-sm">
            <h4 className="text-dark fw-bold mb-3">Tu lista de deseos está vacía</h4>
            <p className="text-muted mb-4">Explora nuestro catálogo y marca con un corazón las joyas que más te gusten.</p>
            <Link href="/tienda" className="btn btn-dark px-4 py-2 text-white">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden bg-white">
                  <div className="position-relative">
                    {item.imageUrl?.trim() ? (
                      <img
                        src={item.imageUrl.trim()}
                        alt={item.name}
                        className="card-img-top wishlist-product-image object-fit-cover"
                      />
                    ) : (
                      <div
                        className="wishlist-product-image bg-light d-flex align-items-center justify-content-center text-muted"
                        aria-label={`Imagen no disponible para ${item.name}`}
                      >
                        <i className="bi bi-image fs-1" aria-hidden="true"></i>
                      </div>
                    )}
                    <button 
                      className="btn position-absolute top-0 end-0 m-3 rounded-circle bg-white shadow-sm p-2 text-danger border-0"
                      onClick={() => toggleWishlist(item)}
                      title="Quitar de favoritos"
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <span className="badge wishlist-material-label text-uppercase align-self-start mb-2 text-white">
                      {item.material}
                    </span>
                    <h5 className="fw-bold text-dark mb-2">{item.name}</h5>
                    <p className="fw-bold fs-5 mb-3 text-dark">${item.price.toLocaleString('es-CL')}</p>
                    
                    <div className="mt-auto d-flex gap-2">
                      <button 
                        className="btn btn-dark btn-sm flex-grow-1 fw-semibold text-white"
                        onClick={() => handleMoveToCart(item)}
                      >
                        🛒 Mover al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}