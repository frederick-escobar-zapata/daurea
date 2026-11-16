// src/context/ToastContext.tsx
'use client';

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    
    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* COMPONENTE VISUAL DEL TOAST FLOTANTE */}
      {toast.visible && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="app-toast toast show text-white shadow-lg border-0 rounded-3 px-3 py-2 d-flex align-items-center gap-3">
            <span className="fs-5 text-daurea-gold">✨</span>
            <div className="flex-grow-1">
              <strong className="app-toast-title d-block small text-uppercase">
                D'ÁUREA Notificación
              </strong>
              <span className="small text-light">{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de un ToastProvider');
  }
  return context;
};