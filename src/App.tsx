// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext'; // <-- 1. Importamos el proveedor
import { PublicLayout } from './routes/PublicLayout';
import { AdminLayout } from './routes/AdminLayout';
import { Home } from './pages/Home';
import Tienda from './pages/Tienda';
import { ProductoDetalle } from './pages/ProductoDetalle';
import { Carrito } from './pages/Carrito';
import { Nosotros } from './pages/Nosotros';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { WishlistProvider } from './context/WishlistContext';
import { Favoritos } from './pages/Favoritos';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProductos } from './pages/admin/AdminProductos';
import { AdminPedidos } from './pages/admin/AdminPedidos';

function App() {
  return (
    <CartProvider>
      <ToastProvider> {/* <-- 2. Envolvemos la app aquí */}
        <WishlistProvider>


          <BrowserRouter>
            <Routes>
              {/* RUTAS PÚBLICAS */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/producto/:id" element={<ProductoDetalle />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
                <Route path="/Favoritos" element={<Favoritos />} />
              </Route>

              {/* RUTAS PRIVADAS (ADMIN) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="productos" element={<AdminProductos />} />
                <Route path="pedidos" element={<AdminPedidos />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;