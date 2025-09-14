// Importa el servicio de usuarios para interactuar con la lógica de negocio
const userService = require('../services/userService');

// Define la clase UserController que maneja las operaciones CRUD para usuarios
class UserController {
  /**
   * Obtiene todos los usuarios.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async getAll(req, res, next) {
    try {
      // Llama al servicio para obtener todos los usuarios
      const users = await userService.getAllUsers();
      // Responde con un estado 200 (OK) y la lista de usuarios
      res.status(200).json(users);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Obtiene un usuario por su ID.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async getById(req, res, next) {
    try {
      // Llama al servicio para obtener un usuario por el ID de los parámetros de la ruta
      const user = await userService.getUserById(req.params.id);
      // Si el usuario no se encuentra
      if (!user) {
        const err = new Error('User not found');
        err.statusCode = 404; // No encontrado
        return next(err);
      }
      // Responde con un estado 200 (OK) y el usuario encontrado
      res.status(200).json(user);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Actualiza un usuario existente.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async update(req, res, next) {
    try {
      // Llama al servicio para actualizar un usuario con el ID de los parámetros y los datos del cuerpo de la solicitud
      const user = await userService.updateUser(req.params.id, req.body);
      // Si el usuario no se encuentra
      if (!user) {
        const err = new Error('User not found');
        err.statusCode = 404; // No encontrado
        return next(err);
      }
      // Responde con un estado 200 (OK) y el usuario actualizado
      res.status(200).json(user);
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Elimina un usuario existente.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async delete(req, res, next) {
    try {
      // Llama al servicio para eliminar un usuario por el ID de los parámetros de la ruta
      const result = await userService.deleteUser(req.params.id);
      // Si el usuario no se encuentra
      if (!result) {
        const err = new Error('User not found');
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

// Exporta una nueva instancia de UserController
module.exports = new UserController();