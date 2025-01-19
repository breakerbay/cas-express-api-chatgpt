import { Router } from 'express';
import {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    patchProject,
    deleteProject,
} from '../controllers/projectsController';

const router = Router();

// Define routes
router.get('/projects', getAllProjects); // Get all projects
router.get('/projects/:projectId', getProject); // Get a single project by ID
router.post('/projects', createProject); // Create a new project
router.put('/projects/:projectId', updateProject); // Update a project (full update)
router.patch('/projects/:projectId', patchProject); // Partially update a project
router.delete('/projects/:projectId', deleteProject); // Delete a project

export default router;