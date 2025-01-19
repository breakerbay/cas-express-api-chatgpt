import { Router } from 'express';
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
} from '../controllers/usersController';

const router = Router();

// Define routes
router.get('/users', getAllUsers); // Get all users
router.get('/users/:userId', getUser); // Get a single user by ID
router.post('/users', createUser); // Create a new user
router.put('/users/:userId', updateUser); // Update a user (full update)
router.patch('/users/:userId', patchUser); // Partially update a user
router.delete('/users/:userId', deleteUser); // Delete a user

export default router;