// src/routes/checklistTypeRoutes.ts
import express from 'express';
import {
    getChecklistTypes,
    getChecklistType,
    updateChecklistType,
    deleteChecklistType,
} from '../controllers/checklistTypeController';

const router = express.Router();

router.get('/checklisttypes', getChecklistTypes);
router.get('/checklisttypes/:id', getChecklistType);
router.put('/checklisttypes/:id', updateChecklistType);
router.delete('/checklisttypes/:id', deleteChecklistType);

export default router;