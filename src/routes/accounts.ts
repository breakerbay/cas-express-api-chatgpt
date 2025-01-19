import express from 'express';
import {
    getAccounts,
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    getWorld
} from '../controllers/accountsController';  // Import controller functions

const router = express.Router();

// Define routes with appropriate controller functions
router.get('/world/:id', getWorld);
router.get('/accounts', getAccounts);
router.get('/accounts/:accountId', getAccount);
router.post('/accounts', createAccount);
router.put('/accounts/:accountId', updateAccount);
router.delete('/accounts/:accountId', deleteAccount);

export default router;
