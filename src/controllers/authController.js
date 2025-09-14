// Importa los módulos y librerías necesarios
const { User } = require('../models'); // Modelo de Usuario para interactuar con la base de datos
const jwt = require('jsonwebtoken'); // Librería para generar y verificar JSON Web Tokens (JWT)
const logger = require('../config/logger'); // Módulo de logging para registrar eventos

// Define la clase AuthController que maneja la lógica de autenticación
class AuthController {
  /**
   * Registra un nuevo usuario en la base de datos.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async register(req, res, next) {
    try {
      // Extrae el nombre, email y contraseña del cuerpo de la solicitud
      const { name, email, password } = req.body;
      // Crea un nuevo usuario en la base de datos
      const user = await User.create({ name, email, password });

      // Responde con un estado 201 (Creado) y un mensaje de éxito
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      // Si el error es de restricción única de Sequelize (email duplicado)
      if (error.name === 'SequelizeUniqueConstraintError') {
        error.statusCode = 409; // Conflicto
        error.message = 'Email is already registered.';
      }
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }

  /**
   * Inicia sesión de un usuario existente.
   * @param {object} req - Objeto de solicitud de Express.
   * @param {object} res - Objeto de respuesta de Express.
   * @param {function} next - Función para pasar al siguiente middleware.
   */
  async login(req, res, next) {
    try {
      // Extrae el email y la contraseña del cuerpo de la solicitud
      const { email, password } = req.body;
      // Busca un usuario en la base de datos con el email proporcionado
      const user = await User.findOne({ where: { email } });

      // Si el usuario no existe o la contraseña no es válida
      if (!user || !user.validPassword(password)) {
        const err = new Error('Invalid email or password');
        err.statusCode = 401; // No autorizado
        return next(err);
      }

      // Genera un token JWT para el usuario
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Responde con un estado 200 (OK) y el token JWT
      res.status(200).json({
        success: true,
        token: token,
      });
    } catch (error) {
      // Pasa el error al siguiente middleware (manejador de errores)
      next(error);
    }
  }
}

// Exporta una nueva instancia de AuthController
module.exports = new AuthController();