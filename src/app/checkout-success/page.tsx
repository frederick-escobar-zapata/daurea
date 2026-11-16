// src/app/checkout-success/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-5 rounded-4 bg-white">
            {/* Ícono o sello de éxito */}
            <div className="mb-4">
              <span className="display-4">✨💍✨</span>
            </div>

            <h1 className="font-serif fw-bold text-daurea-espresso mb-3">
              ¡Pedido Enviado con Éxito!
            </h1>

            <p className="text-muted mb-4">
              Muchas gracias por confiar en **D'ÁUREA**. Tu solicitud de pedido ha sido redactada y enviada a través de WhatsApp. Nos pondremos en contacto contigo a la brevedad para coordinar el pago por transferencia y los detalles de tu despacho con envoltorio de regalo corporativo.
            </p>

            <div className="d-flex flex-column gap-2">
              <Link
                href="/tienda"
                className="btn btn-daurea-gold py-3 fw-semibold text-uppercase text-white rounded-2 text-decoration-none shadow-sm"
              >
                Volver al Catálogo 🛍️
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}