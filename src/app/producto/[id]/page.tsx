// src/app/producto/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images?: string[];
  imageUrl?: string;
  category?: { name: string };
  material?: { name: string };
}

export default function ProductoDetallePage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          console.error('Producto no encontrado en la API');
        }
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const mainImage = product.images?.[0] || product.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop';
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      material: product.material?.name || 'Plata / Acero',
      imageUrl: mainImage,
    }, quantity);

    showToast(`¡${quantity} unidad(es) de "${product.name}" agregadas al carrito!`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Cargando detalles de la joya...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2 className="font-serif fw-bold text-daurea-espresso">Joya no encontrada</h2>
        <p className="text-muted">El producto que buscas no existe o fue eliminado.</p>
        <a href="/tienda" className="btn btn-daurea-gold text-white mt-3">Volver al Catálogo</a>
      </div>
    );
  }

  const mainImage = product.images?.[0] || product.imageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop';
  const categoryName = typeof product.category === 'object' ? product.category?.name : 'Joyería';
  const materialName = typeof product.material === 'object' ? product.material?.name : 'Plata / Acero';

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-3">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="img-fluid rounded-3 object-fit-cover"
              style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <span className="text-uppercase small text-muted tracking-wider fw-semibold">
            {categoryName} • {materialName}
          </span>
          <h1 className="font-serif fw-bold text-daurea-espresso display-5 mt-1 mb-2">
            {product.name}
          </h1>
          <p className="text-muted small mb-3">Ref. #{product.id}</p>

          <h2 className="text-daurea-gold fw-bold display-6 mb-4">
            ${Number(product.price).toLocaleString('es-CL')}
          </h2>

          <p className="text-secondary mb-4" style={{ lineHeight: '1.7' }}>
            {product.description || 'Pieza exclusiva diseñada bajo estrictos estándares de calidad. Hipoalergénico, con acabado brillante de alta duración resistente al uso diario.'}
          </p>

          <div className="mb-4">
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'} mb-2`}>
              {product.stock > 0 ? `Stock disponible: ${product.stock} unidades` : 'Agotado'}
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="input-group" style={{ width: '130px' }}>
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >-</button>
              <input 
                type="text" 
                className="form-control text-center bg-white" 
                value={quantity} 
                readOnly 
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >+</button>
            </div>

            <button 
              className="btn btn-daurea-gold text-white fw-semibold flex-grow-1 py-2 shadow-sm"
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
            >
              AÑADIR AL CARRITO
            </button>

            <button className="btn btn-outline-secondary py-2 px-3">
              <i className="bi bi-heart"></i>
            </button>
          </div>

          <div className="card bg-light border-0 rounded-3 p-3">
            <ul className="list-unstyled m-0 small text-muted d-flex flex-column gap-2">
              <li>✨ Garantía de calidad en Plata y Acero Quirúrgico</li>
              <li>📦 Despachos seguros a todo Chile</li>
              <li>🎁 Incluye envoltorio de regalo corporativo D'ÁUREA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}