// src/app/layout.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { WishlistProvider } from '@/context/WishlistContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              <main>
                {children}
              </main>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}