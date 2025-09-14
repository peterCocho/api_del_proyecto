'use strict';

// Importa la librería Sequelize para la gestión de la base de datos.
const Sequelize = require('sequelize');
// Determina el entorno de ejecución (desarrollo, producción, etc.), por defecto 'development'.
const env = process.env.NODE_ENV || 'development';
// Carga la configuración de la base de datos correspondiente al entorno actual.
const config = require('../config/database.js')[env];
// Objeto que contendrá todos los modelos y la conexión a la base de datos.
const db = {};

// Declara la variable para la instancia de Sequelize.
let sequelize;
// Verifica si la configuración especifica el uso de una variable de entorno para la conexión.
if (config.use_env_variable) {
  // Crea una nueva instancia de Sequelize usando la variable de entorno.
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Crea una nueva instancia de Sequelize usando los parámetros de configuración (base de datos, usuario, contraseña).
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Carga explícita de modelos para compatibilidad con el empaquetador 'pkg'.
// Importa y define el modelo 'User'.
const userModel = require('./user.js')(sequelize, Sequelize.DataTypes);
// Agrega el modelo 'User' al objeto 'db'.
db[userModel.name] = userModel;

// Importa y define el modelo 'Product'.
const productModel = require('./product.js')(sequelize, Sequelize.DataTypes);
// Agrega el modelo 'Product' al objeto 'db'.
db[productModel.name] = productModel;

// Itera sobre todos los modelos en el objeto 'db' para establecer asociaciones.
Object.keys(db).forEach(modelName => {
  // Si un modelo tiene un método 'associate', lo llama para crear las relaciones.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Agrega la instancia de Sequelize al objeto 'db'.
db.sequelize = sequelize;
// Agrega la clase Sequelize al objeto 'db' para poder usar sus tipos de datos y otras utilidades.
db.Sequelize = Sequelize;

// Exporta el objeto 'db' que contiene la conexión y todos los modelos.
module.exports = db;