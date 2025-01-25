// src/routes/checkpointValueRoutes.ts
import express from 'express';
import {
    getCheckpointvalues,
    getCheckpointvalue,
    createCheckpointvalue,
    updateCheckpointvalue,
    deleteCheckpointvalue,
} from '../controllers/checkpointValueController';

const router = express.Router();

router.get('/checkpointvalues', getCheckpointvalues);
router.get('/checkpointvalues/:id', getCheckpointvalue);
router.post('/checkpointvalues', createCheckpointvalue);
router.put('/checkpointvalues/:id', updateCheckpointvalue);
router.delete('/checkpointvalues/:id', deleteCheckpointvalue);

export default router;