// src/app/carrito/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  // Función para procesar y enviar el pedido por WhatsApp
  // Función para procesar, vaciar el carrito y enviar por WhatsApp
const handleWhatsAppCheckout = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56900000000";

    const itemsDescription = cart
      .map((item) => `- ${item.quantity}x ${item.name} (${item.material}) - $${(item.price * item.quantity).toLocaleString('es-CL')}`)
      .join('%0A');

    const formattedTotal = subtotal.toLocaleString('es-CL');

    const message = `*¡Hola D'ÁUREA!* ✨%0A%0AMe gustaría confirmar el siguiente pedido:%0A${itemsDescription}%0A%0A*Total a pagar:* $${formattedTotal}%0A%0A*Mis datos de envío:*%0ANombre:%0ADirección (Calle, número, comuna/región):%0A%0A¡Quedo atenta/o para coordinar el pago por transferencia! 💍`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // 1. Vaciar el carrito de compras
    clearCart();

    // 2. Redirigir a la nueva página de éxito informativa
    window.location.href = '/checkout-success';
  };

  if (cart.length === 0) {
    return (
      <div className="container cart-empty-state py-5 text-center">
        <h2 className="font-serif fw-bold text-daurea-espresso mb-3">Tu Carrito está vacío</h2>
        <p className="text-muted mb-4">Aún no has agregado ninguna joya o accesorio a tu carro de compras.</p>
        <Link href="/tienda" className="btn btn-daurea-gold px-5 py-3 text-uppercase fw-semibold rounded-pill text-white text-decoration-none">
          Explorar Catálogo 💍
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="font-serif fw-bold text-daurea-espresso mb-4">Carrito de Compras</h1>

      <div className="row g-5">
        {/* LISTA DE PRODUCTOS EN EL CARRITO */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-3">
            {cart.map((item) => (
              <div key={item.id} className="card border-0 shadow-sm p-3 rounded-3 d-flex flex-row align-items-center gap-3 bg-white">
                {item.imageUrl?.trim() ? (
                  <img
                    src={item.imageUrl.trim()}
                    alt={item.name}
                    className="cart-item-image rounded-3 object-fit-cover"
                  />
                ) : (
                  <div
                    className="cart-item-image rounded-3 bg-light d-flex align-items-center justify-content-center text-muted"
                    aria-label={`Imagen no disponible para ${item.name}`}
                  >
                    <i className="bi bi-image fs-4" aria-hidden="true"></i>
                  </div>
                )}
                <div className="flex-grow-1">
                  <h5 className="fw-bold text-daurea-espresso mb-1">{item.name}</h5>
                  <span className="badge bg-light text-muted border mb-2">{item.material}</span>
                  <p className="text-daurea-gold fw-semibold m-0">${item.price.toLocaleString('es-CL')} c/u</p>
                </div>

                {/* Controles de cantidad */}
                <div className="input-group cart-quantity-control">
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    className="form-control text-center form-control-sm bg-white fw-bold" 
                    value={item.quantity} 
                    readOnly 
                  />
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button 
                  className="btn btn-link text-danger fs-5 p-2" 
                  onClick={() => removeFromCart(item.id)}
                  title="Eliminar producto"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
              Vaciar Carrito
            </button>
            <Link href="/tienda" className="text-decoration-none text-daurea-espresso fw-semibold">
              ← Seguir Comprando
            </Link>
          </div>
        </div>

        {/* RESUMEN DEL PEDIDO / WHATSAPP CHECKOUT */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <h4 className="font-serif fw-bold text-daurea-espresso mb-4 border-bottom pb-3">Resumen de Orden</h4>
            
            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 text-muted border-bottom pb-3">
              <span>Despacho a todo Chile</span>
              <span className="text-success fw-semibold">Coordinado por interno</span>
            </div>

            <div className="d-flex justify-content-between mb-4 fw-bold fs-5 text-daurea-espresso">
              <span>Total Estimado</span>
              <span className="text-daurea-gold">${subtotal.toLocaleString('es-CL')}</span>
            </div>

            {/* BOTÓN DE WHATSAPP */}
            <button
              className="btn btn-success w-100 py-3 fw-semibold text-uppercase text-white shadow-sm rounded-2 mb-3 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
              onClick={handleWhatsAppCheckout}
            >
              <i className="bi bi-whatsapp fs-5"></i>
              <span>Finalizar por WhatsApp 💬</span>
            </button>

            <div className="text-center small text-muted">
              <span>✨ Atención personalizada y segura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}