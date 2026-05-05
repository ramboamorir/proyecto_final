import { Router } from 'express';

import { verifyToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roles.js';
import teachersController from '../controllers/teachers.js';

const teacherRouter = Router();

// Methode POST
teacherRouter.post('/' , isAdmin ,teachersController.create);

// Methode GET ALL
teacherRouter.get('/', verifyToken ,teachersController.readAll);

// Methode GET
teacherRouter.get('/:code', verifyToken ,teachersController.read);

// Methode PUT "Update"
teacherRouter.put('/:code', isAdmin ,teachersController.update);

// Methode DELETE
teacherRouter.delete('/:code', isAdmin ,teachersController.delete);

export default teacherRouter;