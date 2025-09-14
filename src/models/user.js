'use strict';
// Importa los tipos de datos y el constructor de modelos de Sequelize, y la librería bcrypt para el hashing de contraseñas
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

// Exporta una función que define el modelo de Usuario
module.exports = (sequelize, DataTypes) => {
  // Define la clase User que extiende de Model
  class User extends Model {
/**
 * Método auxiliar para definir asociaciones.
 * Este método no forma parte del ciclo de vida de Sequelize.
 * El archivo `models/index` llamará automáticamente a este método.
 */

    static associate(models) {
      // define association here
    }

    /**
     * Método para comparar contraseñas.
     * @param {string} password - La contraseña a comparar.
     * @returns {boolean} - True si la contraseña es válida, de lo contrario false.
     */
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  // Inicializa el modelo User con sus atributos y opciones
  User.init(
    {
      // Define el atributo 'name'
      name: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: false, // No puede ser nulo
      },
      // Define el atributo 'email'
      email: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: false, // No puede ser nulo
        unique: true, // Debe ser único
        validate: {
          isEmail: true, // Debe ser un formato de email válido
        },
      },
      // Define el atributo 'password'
      password: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: false, // No puede ser nulo
      },
    },
    {
      sequelize, // Instancia de Sequelize para la conexión a la base de datos
      modelName: 'User', // Nombre del modelo
      hooks: {
        // Hook que se ejecuta antes de crear un nuevo usuario
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        // Hook que se ejecuta antes de actualizar un usuario
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
  // Retorna el modelo User
  return User;
};