import { Router } from 'express';
import {
    getCheckpoint,
    createCheckpoint,
    updateCheckpoint,
    deleteCheckpoint,
    getCheckpoints,
} from '../controllers/checkpointController';

const router = Router();

// Define routes
router.get('/checkpoints/:id', getCheckpoint); // Get a specific checkpoint by ID
router.post('/checkpoints', createCheckpoint); // Create a new checkpoint (deprecated)
router.put('/checkpoints/:id', updateCheckpoint); // Update an existing checkpoint (deprecated)
router.delete('/checkpoints/:id', deleteCheckpoint); // Delete a checkpoint (deprecated)
router.get('/checkpoints', getCheckpoints); // Get all checkpoints (deprecated)

export default router;