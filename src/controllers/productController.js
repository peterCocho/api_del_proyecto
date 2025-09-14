// Importa el servicio de productos para interactuar con la lógica de negocio
const productService = require('../services/productService');

// Define la clase ProductController que maneja las operaciones CRUD para productos
class ProductController {
  /**
   * Crea un nuevo producto.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async create(req, res, next) {
    try {
      // Llama al servicio para crear un producto con los datos del cuerpo de la solicitud
      const product = await productService.createProduct(req.body);
      // Responde con un estado 201 (Creado) y el producto creado
      res.status(201).json(product);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Obtiene todos los productos.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async getAll(req, res, next) {
    try {
      // Llama al servicio para obtener todos los productos
      const products = await productService.getAllProducts();
      // Responde con un estado 200 (OK) y la lista de productos
      res.status(200).json(products);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Obtiene un producto por su ID.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async getById(req, res, next) {
    try {
      // Llama al servicio para obtener un producto por el ID de los parámetros de la ruta
      const product = await productService.getProductById(req.params.id);
      // Si el producto no se encuentra
      if (!product) {
        const err = new Error('Product not found');
        err.statusCode = 404; // No encontrado
        return next(err);
      }
      // Responde con un estado 200 (OK) y el producto encontrado
      res.status(200).json(product);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Actualiza un producto existente.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async update(req, res, next) {
    try {
      // Llama al servicio para actualizar un producto con el ID de los parámetros y los datos del cuerpo de la solicitud
      const product = await productService.updateProduct(req.params.id, req.body);
      // Si el producto no se encuentra
      if (!product) {
        const err = new Error('Product not found');
        err.statusCode = 404; // No encontrado
        return next(err);
      }
      // Responde con un estado 200 (OK) y el producto actualizado
      res.status(200).json(product);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Elimina un producto existente.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async delete(req, res, next) {
    try {
      // Llama al servicio para eliminar un producto por el ID de los parámetros de la ruta
      const result = await productService.deleteProduct(req.params.id);
      // Si el producto no se encuentra
      if (!result) {
        const err = new Error('Product not found');
        err.statusCode = 404; // No encontrado
        return next(err);
      }
      // Responde con un estado 200 (OK) y el resultado de la operación
      res.status(200).json(result);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }
}

// Exporta una nueva instancia de ProductController
module.exports = new ProductController();