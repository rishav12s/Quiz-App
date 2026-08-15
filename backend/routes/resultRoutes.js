import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { createResult, ListResult } from '../controllers/resultController.js';

const resultRouter = express.Router();

resultRouter.post('/', authMiddleware, createResult);
resultRouter.get('/', authMiddleware, ListResult);

export default resultRouter;