import 'dotenv/config'
import connectDB  from './config/db.js';
import dns from 'node:dns';
import express from "express";
import cors from 'cors';

import studentRouter from './routers/student.js';
import teachersRouter from './routers/teachers.js';
import authrouter from './routers/auth.js';

const server = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}

connectDB();

server.use(cors());
server.use(express.json());


server.use('/estudiantes', studentRouter);
server.use('/docentes', teachersRouter);
server.use('/', authrouter);

server.get('/',(req,res)=>{
    res.send('Hello World!');
})

server.listen(PORT, ()=>{
    console.info(`Server conection online: ${PORT}`);
});