// Importa las librerías y módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutamiento de Express
const userController = require('../controllers/userController'); // Controlador de usuarios
const { verifyToken } = require('../middleware/authJwt'); // Middleware para verificar el token de autenticación

// Todas las rutas de usuarios están protegidas y requieren un token de autenticación
router.use(verifyToken);

// Define la ruta para obtener todos los usuarios
router.get('/', userController.getAll);

// Define la ruta para obtener un usuario por su ID
router.get('/:id', userController.getById);

// Define la ruta para actualizar un usuario por su ID
router.put('/:id', userController.update);

// Define la ruta para eliminar un usuario por su ID
router.delete('/:id', userController.delete);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;