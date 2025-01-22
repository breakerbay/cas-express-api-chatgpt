import { Router } from 'express';
import {
    getChecklistGroups,
    getChecklistGroup,
    createChecklistGroup,
    updateChecklistGroup,
    deleteChecklistGroup,
    findByChecklistGroupName,
} from '../controllers/checklistGroupController';

const router = Router();

// Define routes
router.get('/checklistgroups', getChecklistGroups); // Get all checklist groups
router.post('/checklistgroups', createChecklistGroup); // Create a new checklist group
router.get('/checklistgroups/:id', getChecklistGroup); // Get a single checklist group by ID
router.put('/checklistgroups/:id', updateChecklistGroup); // Update a checklist group
router.delete('/checklistgroups/:id', deleteChecklistGroup); // Delete a checklist group
router.get('/checklistgroups/find/:query', findByChecklistGroupName); // Find checklist groups by name

export default router;