// Importa las librerías y módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutamiento de Express
const productController = require('../controllers/productController'); // Controlador de productos
const { verifyToken } = require('../middleware/authJwt'); // Middleware para verificar el token de autenticación
const validate = require('../middleware/validator'); // Middleware para validar los datos de entrada
const { productSchema } = require('../validators/productSchemas'); // Esquema de validación para los productos

// Todas las rutas de productos están protegidas y requieren un token de autenticación
router.use(verifyToken);

// Define la ruta para crear un nuevo producto
// Se utiliza el middleware de validación para asegurar que los datos de entrada son correctos
router.post('/', validate(productSchema), productController.create);

// Define la ruta para obtener todos los productos
router.get('/', productController.getAll);

// Define la ruta para obtener un producto por su ID
router.get('/:id', productController.getById);

// Define la ruta para actualizar un producto por su ID
// Se utiliza el middleware de validación para asegurar que los datos de entrada son correctos
router.put('/:id', validate(productSchema), productController.update);

// Define la ruta para eliminar un producto por su ID
router.delete('/:id', productController.delete);

// Exporta el enrutador para que pueda ser utilizado por la aplicación principal
module.exports = router;