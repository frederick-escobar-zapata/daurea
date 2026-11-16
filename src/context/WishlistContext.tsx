// src/context/WishlistContext.tsx
/* eslint-disable react-refresh/only-export-components */
'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  material: string;
  imageUrl: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'daurea_wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const saved = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as WishlistItem[]) : [];
    } catch (error) {
      console.error('Error al cargar la lista de deseos:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error al guardar la lista de deseos:', error);
    }
  }, [wishlist]);

  const toggleWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const totalWishlist = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, totalWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist debe ser usado dentro de un WishlistProvider');
  }
  return context;
};