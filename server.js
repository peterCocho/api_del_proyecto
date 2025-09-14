// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa las librerías y módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const routes = require('./src/routes'); // Enrutador principal de la aplicación
const logger = require('./src/config/logger'); // Módulo de logging para registrar eventos
const { sequelize } = require('./src/models'); // Instancia de Sequelize para la conexión a la base de datos
const errorHandler = require('./src/middleware/errorHandler'); // Middleware para manejar errores de forma centralizada

// Crea una instancia de la aplicación Express
const app = express();
// Define el puerto en el que se ejecutará el servidor, tomando el valor de las variables de entorno o usando 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middlewares
// Parsea las solicitudes entrantes con payloads JSON
app.use(express.json());
// Parsea las solicitudes entrantes con payloads codificados en URL
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
// Monta el enrutador principal en la ruta /api
app.use('/api', routes);

// Middleware de manejo de errores
// Registra y maneja los errores que ocurran en la aplicación
app.use(errorHandler);

// Inicia el servidor y se conecta a la base de datos
app.listen(PORT, async () => {
  // Registra un mensaje informativo indicando que el servidor se ha iniciado
  logger.info(`Server is running on port ${PORT}`);
  try {
    // Autentica la conexión a la base de datos
    await sequelize.authenticate();
    // Registra un mensaje informativo si la conexión es exitosa
    logger.info('Database connection has been established successfully.');
  } catch (error) {
    // Registra un mensaje de error si no se puede conectar a la base de datos
    logger.error('Unable to connect to the database:', error);
  }
});