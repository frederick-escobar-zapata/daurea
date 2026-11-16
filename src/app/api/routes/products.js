const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
});

// 2. CREAR UN NUEVO PRODUCTO (POST /api/products)
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock, material, category, imageUrl } = req.body;
    
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || '',
        price: parseFloat(price),
        stock: parseInt(stock),
        material,
        category,
        imageUrl: imageUrl || ''
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear la joya' });
  }
});

// 3. ACTUALIZAR UN PRODUCTO (PUT /api/products/:id)
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, material, category, imageUrl } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) }, // O String si tus IDs son UUID / Cuid
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        material,
        category,
        imageUrl
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar la joya' });
  }
});

// 4. ELIMINAR UN PRODUCTO (DELETE /api/products/:id)
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar la joya' });
  }
});

module.exports = router;