# Documentación del Proyecto

## Backend - Django

### Descripción General

El backend de este proyecto está desarrollado en **Django**, utilizando **PostgreSQL** como base de datos. Proporciona un conjunto de APIs para acceder a las **categorías** y **productos**, con soporte para **paginación**. Además, permite a los usuarios **registrarse** y **autenticarse** utilizando **JWT (JSON Web Tokens)**. La documentación de la API está disponible a través de **Swagger**.

### Tecnologías

- **Django**: Framework web para Python.
- **PostgreSQL**: Base de datos relacional.
- **JWT (Simple JWT)**: Para la autenticación de usuarios.
- **Swagger**: Documentación interactiva de la API.
- **Nginx**: Servidor web utilizado para la distribución en producción.

### Funcionalidades Clave

1. **Autenticación y Registro**:

   - Los usuarios pueden registrarse en la API.
   - **Autenticación completa** utilizando JWT.
   - Generación de tokens de acceso y refresh.

2. **APIs**:

   - **Categorías**: Listado y detalle de categorías con paginación.
   - **Productos**: Listado y detalle de productos con paginación.
   - **Creación y edición de productos**: Funcionalidad aún no disponible.

3. **Swagger**: Documentación interactiva de las APIs, accesible en `/swagger/` o un endpoint similar.

### Configuración en Producción

- Se utiliza **Nginx** como servidor para distribuir la aplicación en producción.

---

## Frontend - React

### Descripción General

El frontend está desarrollado en **React** utilizando **Vite** para la configuración y desarrollo rápido. Está diseñado para manejar la autenticación de usuarios mediante **JWT**, y ofrece una interfaz simple para que los usuarios puedan iniciar sesión, registrarse y recuperar sus contraseñas.

### Tecnologías

- **React**: Biblioteca de JavaScript para interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para desarrollo frontend.
- **React Router**: Para gestionar las rutas dentro de la aplicación.
- **Axios**: Para la comunicación con las APIs del backend.
- **JWT**: Para la autenticación basada en tokens.
- **React Query**: Para la gestión de la cache y el estado de las consultas de API.

### Funcionalidades Clave

1. **Autenticación**:

   - **Login**: Inicio de sesión de usuarios con JWT.
   - **Registro**: Registro de nuevos usuarios.
   - **Forgot Password**: Funcionalidad para la recuperación de contraseñas.
   - **Token Refresh**: Renovación automática de tokens JWT cuando el token está por expirar.

2. **Navegación**:

   - Uso de **React Router** para la navegación entre las diferentes páginas.

3. **Creación y edición de productos**: Funcionalidad aún en desarrollo.

---

### Instalación y Configuración

#### Backend

1. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

2. Opcional levantar docker

```bash
   docker-compose up --build
```
