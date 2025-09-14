// Importa el modelo de Usuario para interactuar con la base de datos
const { User } = require('../models');

// Define la clase UserService que encapsula la lógica de negocio para los usuarios
class UserService {
  /**
   * Obtiene todos los usuarios de la base de datos, excluyendo la contraseña.
   * @returns {Promise<User[]>} - Una lista de todos los usuarios.
   */
  async getAllUsers() {
    return await User.findAll({ attributes: { exclude: ['password'] } });
  }

  /**
   * Obtiene un usuario por su ID, excluyendo la contraseña.
   * @param {number} id - ID del usuario a buscar.
   * @returns {Promise<User|null>} - El usuario encontrado o null si no existe.
   */
  async getUserById(id) {
    return await User.findByPk(id, { attributes: { exclude: ['password'] } });
  }

  /**
   * Actualiza un usuario existente en la base de datos.
   * @param {number} id - ID del usuario a actualizar.
   * @param {object} userData - Nuevos datos para el usuario.
   * @returns {Promise<User|null>} - El usuario actualizado o null si no se encuentra.
   */
  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    // Asegura que la contraseña no se actualice directamente a través de este método por seguridad
    const { password, ...safeUpdateData } = userData;
    return await user.update(safeUpdateData);
  }

  /**
   * Elimina un usuario de la base de datos.
   * @param {number} id - ID del usuario a eliminar.
   * @returns {Promise<{message: string}|null>} - Un mensaje de éxito o null si el usuario no se encuentra.
   */
  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    await user.destroy();
    return { message: 'User deleted successfully' };
  }
}

// Exporta una nueva instancia de UserService
module.exports = new UserService();