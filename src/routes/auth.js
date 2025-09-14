// Importa las librerías y módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutamiento de Express
const authController = require('../controllers/authController'); // Controlador de autenticación
const validate = require('../middleware/validator'); // Middleware para validar los datos de entrada
const { registerSchema, loginSchema } = require('../validators/authSchemas'); // Esquemas de validación para el registro y el inicio de sesión

// Define la ruta para el registro de usuarios
// Se utiliza el middleware de validación para asegurar que los datos de entrada son correctos
router.post('/register', validate(registerSchema), authController.register);

// Define la ruta para el inicio de sesión de usuarios
// Se utiliza el middleware de validación para asegurar que los datos de entrada son correctos
router.post('/login', validate(loginSchema), authController.login);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;