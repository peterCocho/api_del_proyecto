# Guía de Despliegue y Prueba Multiplataforma de la API RESTful

**Proyecto de Servidor Backend con Node.js**

Estimado instructor,

Esta guía detalla el procedimiento para configurar y probar la aplicación de servidor contenida en este paquete. La API ha sido desarrollada con Node.js y se distribuye como un ejecutable nativo para Windows, macOS y Linux.

---

### **Contenido del Paquete**

El archivo comprimido contiene los siguientes elementos:

- **Ejecutables del Servidor:**
  - `api-server-win.exe`: Versión para Windows.
  - `api-server-linux`: Versión para Linux.
  - `api-server-macos`: Versión para macOS.
- **`config.env`**: Archivo de plantilla para las variables de entorno.
- **`database_schema.sql`**: Script SQL para la creación de la base de datos y sus tablas.
- **`Insomnia_API_Collection.json`**: Colección de peticiones para el cliente API Insomnia.

*(Nota: Se recomienda renombrar los ejecutables generados a los nombres más cortos y claros listados arriba para facilitar su uso)*.

### **Requisitos Previos**

- Un sistema de gestión de bases de datos **MySQL** instalado y en ejecución.
- Un cliente de API como **Insomnia** (recomendado) o **Postman**.

---

### **Procedimiento de Configuración**

Los siguientes pasos son universales para todos los sistemas operativos.

#### **Paso 1: Configuración de la Base de Datos**

1.  Abra su cliente de administración de MySQL (ej. MySQL Workbench, DBeaver).
2.  Ejecute el script **`database_schema.sql`**. Este creará la base de datos `nodejs_api` y las tablas `Users` y `Products`.

#### **Paso 2: Configuración de Variables de Entorno**

1.  Localice el archivo `config.env` y cree una copia llamada **`.env`**.
2.  Abra el nuevo archivo `.env` y modifique los valores de `DB_USER` y `DB_PASSWORD` para que coincidan con su configuración local de MySQL.

---

### **Paso 3: Ejecución del Servidor**

Este paso varía ligeramente según el sistema operativo.

#### **Para Windows**

1.  Abra una terminal de **Símbolo del sistema (CMD)** o **PowerShell**.
2.  Navegue hasta la ruta de la carpeta que contiene estos archivos.
3.  Ejecute la aplicación con el siguiente comando:
    ```bash
    .\api-server-win.exe
    ```

#### **Para macOS y Linux**

1.  Abra la aplicación **Terminal**.
2.  Navegue hasta la ruta de la carpeta que contiene estos archivos.
3.  **Otorgue permisos de ejecución** al archivo. Este es un paso de seguridad requerido en sistemas UNIX. Ejecute el comando correspondiente a su sistema:
    - En Linux: `chmod +x api-server-linux`
    - En macOS: `chmod +x api-server-macos`
4.  Ahora, inicie el servidor con el comando correspondiente:
    - En Linux: `./api-server-linux`
    - En macOS: `./api-server-macos`

Independientemente del sistema operativo, si la configuración es correcta, la terminal mostrará mensajes de confirmación. **No cierre esta ventana**, ya que el servidor se detendría.

```
info: Server is running on port 3000
info: Database connection has been established successfully.
```

---

### **Paso 4: Prueba de la API con Insomnia**

Este paso es universal.

1.  Abra la aplicación Insomnia e importe el archivo **`Insomnia_API_Collection.json`**.
2.  Siga el flujo de autenticación:
    a.  **Registro**: Ejecute la petición `[Auth] > Register User`.
    b.  **Login**: Ejecute `[Auth] > Login User` para obtener el `token` de acceso.
    c.  **Configuración del Token**: Copie el token y péguelo en la variable de entorno `jwt_token` de Insomnia.
    d.  **Prueba de Endpoints**: Ejecute las peticiones de los grupos `Users` o `Products`.

---

Quedo a su disposición para cualquier duda o consulta.