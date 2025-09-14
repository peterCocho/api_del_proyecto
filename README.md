# 🚀 API REST Sólida con Node.js

¡Bienvenido a la API REST Sólida! Este proyecto es una API robusta y escalable construida con Node.js, Express y Sequelize. Sigue las mejores prácticas de la industria para proporcionar una base sólida para tus aplicaciones.

## ✨ Características

*   **Autenticación JWT**: Rutas seguras con JSON Web Tokens.
*   **Validación de Datos**: Validación de entrada robusta con Joi.
*   **ORM Sequelize**: Interacción con la base de datos PostgreSQL de una manera sencilla y segura.
*   **Manejo de Errores Centralizado**: Middleware para un manejo de errores consistente.
*   **Logging**: Registro detallado de eventos de la aplicación con Winston.
*   **Estructura de Proyecto Escalable**: Organizado en controladores, servicios, modelos y rutas.

## 📂 Estructura del Proyecto

```
.
├── 📁 logs
│   ├── 📄 app.log
│   └── 📄 error.log
├── 📁 src
│   ├── 📁 config
│   │   ├── 📄 database.js
│   │   └── 📄 logger.js
│   ├── 📁 controllers
│   │   ├── 📄 authController.js
│   │   ├── 📄 productController.js
│   │   └── 📄 userController.js
│   ├── 📁 db
│   │   ├── 📁 migrations
│   │   └── 📁 seeders
│   ├── 📁 middleware
│   │   ├── 📄 authJwt.js
│   │   ├── 📄 errorHandler.js
│   │   └── 📄 validator.js
│   ├── 📁 models
│   │   ├── 📄 index.js
│   │   ├── 📄 product.js
│   │   └── 📄 user.js
│   ├── 📁 routes
│   │   ├── 📄 auth.js
│   │   ├── 📄 index.js
│   │   ├── 📄 products.js
│   │   └── 📄 users.js
│   ├── 📁 services
│   │   ├── 📄 productService.js
│   │   └── 📄 userService.js
│   └── 📁 validators
│       ├── 📄 authSchemas.js
│       └── 📄 productSchemas.js
├── 📄 .env
├── 📄 .eslintrc.json
├── 📄 .prettierrc.json
├── 📄 .sequelizerc
├── 📄 database_schema.sql
├── 📄 package.json
├── 📄 README.md
└── 📄 server.js
```

## 🛠️ Tecnologías Utilizadas

*   **Node.js**: Entorno de ejecución de JavaScript.
*   **Express**: Framework de aplicación web.
*   **Sequelize**: ORM para Node.js.
*   **PostgreSQL**: Base de datos relacional de objetos.
*   **JSON Web Token (JWT)**: Para la autenticación.
*   **Bcrypt.js**: Para el hashing de contraseñas.
*   **Joi**: Para la validación de datos.
*   **Winston**: Para el logging.
*   **Dotenv**: Para la gestión de variables de entorno.

## 🚀 Empezando

### Prerrequisitos

*   Node.js (v14 o superior)
*   NPM
*   PostgreSQL

### Instalación

1.  Clona el repositorio:
    ```sh
    git clone https://URL-DE-TU-REPOSITORIO.git
    ```
2.  Instala las dependencias:
    ```sh
    npm install
    ```
3.  Configura tus variables de entorno en un archivo `.env`:
    ```
    PORT=3000
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=tu_base_de_datos
    JWT_SECRET=tu_secreto_jwt
    JWT_EXPIRES_IN=1h
    ```
4.  Ejecuta las migraciones de la base de datos:
    ```sh
    npx sequelize-cli db:migrate
    ```

### Uso

Para iniciar el servidor, ejecuta:

```sh
npm start
```

## Endpoints de la API

### Autenticación

*   `POST /api/auth/register`: Registrar un nuevo usuario.
*   `POST /api/auth/login`: Iniciar sesión y obtener un token JWT.

### Usuarios

*   `GET /api/users`: Obtener todos los usuarios.
*   `GET /api/users/:id`: Obtener un usuario por su ID.
*   `PUT /api/users/:id`: Actualizar un usuario por su ID.
*   `DELETE /api/users/:id`: Eliminar un usuario por su ID.

### Productos

*   `GET /api/products`: Obtener todos los productos.
*   `GET /api/products/:id`: Obtener un producto por su ID.
*   `POST /api/products`: Crear un nuevo producto.
*   `PUT /api/products/:id`: Actualizar un producto por su ID.
*   `DELETE /api/products/:id`: Eliminar un producto por su ID.