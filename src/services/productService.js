// Importa el modelo de Producto para interactuar con la base de datos
const { Product } = require('../models');

// Define la clase ProductService que encapsula la lógica de negocio para los productos
class ProductService {
  /**
   * Crea un nuevo producto en la base de datos.
   * @param {object} productData - Datos del producto a crear.
   * @returns {Promise<Product>} - El producto creado.
   */
  async createProduct(productData) {
    return await Product.create(productData);
  }

  /**
   * Obtiene todos los productos de la base de datos.
   * @returns {Promise<Product[]>} - Una lista de todos los productos.
   */
  async getAllProducts() {
    return await Product.findAll();
  }

  /**
   * Obtiene un producto por su ID.
   * @param {number} id - ID del producto a buscar.
   * @returns {Promise<Product|null>} - El producto encontrado o null si no existe.
   */
  async getProductById(id) {
    return await Product.findByPk(id);
  }

  /**
   * Actualiza un producto existente en la base de datos.
   * @param {number} id - ID del producto a actualizar.
   * @param {object} productData - Nuevos datos para el producto.
   * @returns {Promise<Product|null>} - El producto actualizado o null si no se encuentra.
   */
  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (!product) {
      return null;
    }
    return await product.update(productData);
  }

  /**
   * Elimina un producto de la base de datos.
   * @param {number} id - ID del producto a eliminar.
   * @returns {Promise<{message: string}|null>} - Un mensaje de éxito o null si el producto no se encuentra.
   */
  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) {
      return null;
    }
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }
}

// Exporta una nueva instancia de ProductService
module.exports = new ProductService();