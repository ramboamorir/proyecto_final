# proyecto_final
# 📚 Sistema de Gestión Escolar

**Fullstack App - Angular + Node.js + MongoDB**

---

## 🚀 Descripción

Aplicación web fullstack para la gestión de estudiantes y docentes, con autenticación basada en JWT y control de acceso por roles.

Permite a los usuarios registrarse, iniciar sesión y gestionar información académica dependiendo de su rol dentro del sistema.

---

## 🧱 Tecnologías utilizadas

### 🔹 Frontend

* Angular (Standalone Components)
* TypeScript
* FormsModule + ngModel
* HttpClient
* Bootstrap (UI)

### 🔹 Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### 🔹 Seguridad

* JWT (JSON Web Tokens)
* bcryptjs (hash de contraseñas)

---

## 🧩 Arquitectura del Proyecto

### 📁 Entidades

#### 👤 Users

* name
* email
* password (hash con bcrypt)
* role (`admin` | `user`)

#### 🎓 Students

* code
* name
* lastname
* age
* note
* code_teacher (relación con Teacher)

#### 👨‍🏫 Teachers

* code
* name
* lastname
* email
* workday
* password

---

## 🔐 Autenticación y Autorización

### ✔ Registro

* Se encripta la contraseña con `bcrypt.hash`

### ✔ Login

* Validación con `bcrypt.compare`
* Generación de token JWT

### ✔ Roles

* `admin` → acceso a módulo de docentes
* `user` → acceso a módulo de estudiantes

### ✔ Frontend

* Token almacenado en `localStorage`
* Redirección automática según rol

---

## ⚙️ Funcionalidades principales

### 👤 Usuarios

* Registro
* Login
* Manejo de roles

### 🎓 Estudiantes (CRUD)

* Crear estudiante
* Listar estudiantes
* Editar estudiante
* Eliminar estudiante

### 👨‍🏫 Docentes (CRUD)

* Crear docente
* Listar docentes
* Editar docente
* Eliminar docente

---

## 🔗 Comunicación Frontend - Backend

* Consumo de API REST con `HttpClient`
* Envío de datos en formato JSON
* Uso de endpoints protegidos con JWT (en proceso)

---

## ⚠️ Problemas encontrados (y aprendizajes)

Durante el desarrollo se enfrentaron varios problemas comunes en aplicaciones fullstack:

* ❌ `bcrypt undefined`
* ❌ `password undefined` en login
* ❌ `req.body undefined`
* ❌ errores 500 en backend
* ❌ `ngModel` no enviando datos correctamente
* ❌ inconsistencias entre Postman y Angular
* ❌ datos no renderizados en Angular

### 💡 Soluciones aplicadas

* Uso de `express.json()`
* Validación correcta del body
* Manejo de respuestas consistentes
* Inicialización de arrays en Angular
* Control de asincronía en frontend

---

## 🛠 Instalación y ejecución

### 🔹 Backend

```bash
cd backend
npm install
npm run dev
```

### 🔹 Frontend

```bash
cd frontend
npm install
ng serve
```

---

## 🌐 Endpoints principales

### 🔐 Auth

* `POST /register`
* `POST /login`

### 🎓 Students

* `GET /students`
* `POST /students`
* `PUT /students/:id`
* `DELETE /students/:id`

### 👨‍🏫 Teachers

* `GET /teachers`
* `POST /teachers`
* `PUT /teachers/:id`
* `DELETE /teachers/:id`

---

## 🚧 Mejoras futuras

* 🔐 Interceptor JWT en Angular
* 🛡 Guards por roles
* 📊 Mejor UI/UX (notificaciones, loaders)
* 🧠 Tipado fuerte (eliminar `any`)
* 🔄 Manejo global de errores
* 🔍 Filtros y búsqueda
* 📱 Diseño responsive avanzado

---

## 📌 Estado del proyecto

🟡 En desarrollo (funcional base completada)

---

## 👨‍💻 Autor

Proyecto desarrollado como práctica fullstack con enfoque en:

* Integración Angular + Node
* Manejo de autenticación
* Arquitectura CRUD
* Debugging real de aplicaciones

---

## 💬 Notas finales

Este proyecto refleja un proceso real de aprendizaje, incluyendo errores comunes y su resolución. La base actual permite escalar hacia una aplicación más robusta y profesional.

---
