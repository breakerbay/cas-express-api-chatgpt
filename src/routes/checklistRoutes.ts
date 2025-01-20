import { Router } from 'express';
import {
    getAllChecklists,
    getChecklist,
    createChecklist,
    updateChecklist,
    patchChecklist,
    deleteChecklist,
} from '../controllers/checklistsController';

const router = Router();

// Define routes
router.get('/checklists', getAllChecklists); // Get all checklists
router.get('/checklists/:checklistId', getChecklist); // Get a single checklist by ID
router.post('/checklists', createChecklist); // Create a new checklist
router.put('/checklists/:checklistId', updateChecklist); // Update a checklist (full update)
router.patch('/checklists/:checklistId', patchChecklist); // Partially update a checklist
router.delete('/checklists/:checklistId', deleteChecklist); // Delete a checklist

export default router;