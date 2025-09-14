'use strict';
// Importa los tipos de datos y el constructor de modelos de Sequelize
const { Model } = require('sequelize');

// Exporta una función que define el modelo de Producto
module.exports = (sequelize, DataTypes) => {
  // Define la clase Product que extiende de Model
  class Product extends Model {
    /**
 * Método auxiliar para definir asociaciones.
 * Este método no forma parte del ciclo de vida de Sequelize.
 * El archivo `models/index` llamará automáticamente a este método.
 */

    static associate(models) {
      // define association here
    }
  }
  // Inicializa el modelo Product con sus atributos y opciones
  Product.init(
    {
      // Define el atributo 'name'
      name: {
        type: DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: false, // No puede ser nulo
      },
      // Define el atributo 'description'
      description: {
        type: DataTypes.TEXT, // Tipo de dato: texto largo
        allowNull: true, // Puede ser nulo
      },
      // Define el atributo 'price'
      price: {
        type: DataTypes.DECIMAL(10, 2), // Tipo de dato: número decimal con 10 dígitos en total y 2 decimales
        allowNull: false, // No puede ser nulo
      },
    },
    {
      sequelize, // Instancia de Sequelize para la conexión a la base de datos
      modelName: 'Product', // Nombre del modelo
    }
  );
  // Retorna el modelo Product
  return Product;
};