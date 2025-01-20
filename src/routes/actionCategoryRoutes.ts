import { Router } from 'express';
import {
    getActionCategories,
    getActionCategory,
    createActionCategory,
    updateActionCategory,
    deleteActionCategory,
    findActionCategoryByName,
} from '../controllers/actionCategoryController';

const router = Router();

// Define routes
router.get('/actioncategories', getActionCategories); // Get all action categories
router.post('/actioncategories', createActionCategory); // Create a new action category
router.get('/actioncategories/:id', getActionCategory); // Get a single action category by ID
router.put('/actioncategories/:id', updateActionCategory); // Update an action category
router.delete('/actioncategories/:id', deleteActionCategory); // Delete an action category
router.get('/actioncategories/search/:query', findActionCategoryByName); // Search for action categories by name

export default router;