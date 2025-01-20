import { Router } from 'express';
import {getActionTypes, getActionType, createActionType,
    findActionTypeByName,} from "../controllers/actionTypeController";

const router = Router();

// Define routes
router.get('/actiontypes', getActionTypes); // Get all action types
router.post('/actiontypes', createActionType); // Create a new action type
router.get('/actiontypes/:id', getActionType); // Get a single action type by ID
router.get('/actiontypes/search/:query', findActionTypeByName); // Search for action types by name

export default router;