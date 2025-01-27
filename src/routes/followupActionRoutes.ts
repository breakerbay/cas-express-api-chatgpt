import { Router } from 'express';
import {
    getFollowupActions,
    getFollowupAction,
    addFollowupAction,
    updateFollowupAction,
    deleteFollowupAction,
} from '../controllers/followupActionController';

const router = Router();

// Define routes
router.get('/followupactions', getFollowupActions); // Get all followup actions
router.post('/followupactions/:accountId/:checkerId/:checkpointvalueId', addFollowupAction); // Add a new followup action
router.get('/followupactions/:followupactionId', getFollowupAction); // Get a specific followup action by ID
router.put('/followupactions/:followupactionId', updateFollowupAction); // Update an existing followup action
router.delete('/followupactions/:id', deleteFollowupAction); // Delete a followup action

export default router;