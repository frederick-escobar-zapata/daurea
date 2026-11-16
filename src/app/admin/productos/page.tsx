// src/app/admin/productos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Product {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  material: string | { id: number; name: string };
  category: string | { id: number; name: string };
  imageUrl?: string;
  images?: string[];
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    material: 'Plata 925',
    category: 'Anillos',
    imageUrl: ''
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          if (isMounted) setProducts(data);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      // Extraer imagen de imageUrl o del array images si existe
      const img = product.imageUrl || (product.images && product.images[0]) || '';
      const matName = typeof product.material === 'object' ? product.material.name : product.material;
      const catName = typeof product.category === 'object' ? product.category.name : product.category;

      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        material: matName || 'Plata 925',
        category: catName || 'Anillos',
        imageUrl: img
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        material: 'Plata 925',
        category: 'Anillos',
        imageUrl: ''
      });
    }
    setShowModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}` 
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          material: formData.material,
          category: formData.category,
          imageUrl: formData.imageUrl
        }),
      });

      if (response.ok) {
        alert(editingProduct ? '¡Joya actualizada con éxito!' : '¡Joya creada con éxito!');
        setShowModal(false);
        const res = await fetch('/api/products');
        if (res.ok) {
          const updatedData = await res.json();
          setProducts(updatedData);
        }
      } else {
        alert('Hubo un error al guardar el producto en la base de datos.');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error de conexión con el servidor backend.');
    }
  };

  const handleDeleteProduct = async (id: number | string) => {
    if (confirm('¿Estás seguro de eliminar esta joya de la base de datos?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProducts(products.filter(p => p.id !== id));
          alert('Producto eliminado correctamente.');
        } else {
          alert('No se pudo eliminar el producto.');
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="font-serif fw-bold text-daurea-espresso mb-1">Gestión de Inventario</h1>
          <p className="text-muted m-0">Administra las joyas, precios y stock de D'ÁUREA.</p>
        </div>
        <button 
          className="btn btn-daurea-gold text-white fw-semibold px-4 py-2 rounded-2 shadow-sm"
          onClick={() => handleOpenModal()}
        >
          + Nuevo Producto 💍
        </button>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-uppercase fs-7 text-muted">
              <tr>
                <th className="ps-4">Producto</th>
                <th>Material</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">Cargando inventario...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">No hay productos registrados.</td>
                </tr>
              ) : (
                products.map((product) => {
                  // Mapeo seguro para evitar renderizar objetos directamente
                  const materialText = typeof product.material === 'object' ? product.material.name : product.material;
                  const categoryText = typeof product.category === 'object' ? product.category.name : product.category;

                  return (
                    <tr key={product.id}>
                      <td className="ps-4">
                        <div className="fw-bold text-daurea-espresso">{product.name}</div>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '250px' }}>
                          {product.description || 'Sin descripción'}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-light text-muted border">{materialText}</span>
                      </td>
                      <td>{categoryText}</td>
                      <td className="fw-semibold text-daurea-gold">${Number(product.price).toLocaleString('es-CL')}</td>
                      <td>
                        <span className={`badge ${product.stock <= 3 ? 'bg-danger' : 'bg-success'} text-white`}>
                          {product.stock} un.
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button 
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => handleOpenModal(product)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CREAR / EDITAR */}
      {showModal && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title font-serif fw-bold text-daurea-espresso">
                  {editingProduct ? 'Editar Joya' : 'Agregar Nueva Joya'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Nombre del Producto</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Anillo Solitario Plata 925"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold text-muted">Precio (CLP)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="24990"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold text-muted">Stock Inicial</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold text-muted">Material</label>
                      <select 
                        className="form-select"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      >
                        <option value="Plata 925">Plata 925</option>
                        <option value="Acero Quirúrgico">Acero Quirúrgico</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold text-muted">Categoría</label>
                      <select 
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Anillos">Anillos</option>
                        <option value="Collares">Collares</option>
                        <option value="Aros">Aros</option>
                        <option value="Pulseras">Pulseras</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">URL de la Imagen</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-daurea-gold text-white fw-semibold">
                    {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}