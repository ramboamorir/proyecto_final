import 'dotenv/config'
import connectDB  from './config/db.js';
import dns from 'node:dns';
import express from "express";
import cors from 'cors';

import studentRouter from './routers/student.js';
import teachersRouter from './routers/teachers.js';
import authrouter from './routers/auth.js';

// importaciones para acceder a las rutas del front - configurar el acceso al front
import path from "path";
import { fileURLToPath } from "url";

const server = express();
const PORT = process.env.PORT || 3000;

// if (process.env.NODE_ENV !== 'production') {
//   dns.setServers(['8.8.8.8', '8.8.4.4']);
// }

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors());
server.use(express.json());


server.use('/estudiantes', studentRouter);
server.use('/docentes', teachersRouter);
server.use('/', authrouter);

// server.get('/',(req,res)=>{
//     res.send('Hello World!');
// })

// Vamos hacer la petición para que se muestre el front
// Servir archivos estaticos desde la carpeta "public"
server.use(express.static(path.join(__dirname, "public")));

// Ruta principal para servir index.html
server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

server.listen(PORT, ()=>{
    console.info(`Server conection online: ${PORT}`);
});