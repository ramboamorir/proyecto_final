import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roles.js';
import studentsController from '../controllers/students.js';
import jwt from 'jsonwebtoken';

const studentRouter = Router();

// Methode POST
studentRouter.post('/', verifyToken, isAdmin ,studentsController.create);

// Methode GET ALL
studentRouter.get('/', verifyToken ,studentsController.readAll);

// Methode GET
studentRouter.get('/:code', verifyToken ,studentsController.read);

// Methode PUT "Update"
studentRouter.put('/:code', verifyToken, isAdmin ,studentsController.update);

// Methode DELETE
studentRouter.delete('/:code', verifyToken, isAdmin ,studentsController.delete);

export default studentRouter;