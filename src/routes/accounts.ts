import express from 'express';
import { Request, Response } from 'express';
import {
    getAccounts,
    getAccount,
    getAccount2,
    getAccount3,
    getAccount4,
    getAccount5,
    createAccount,
    updateAccount,
    deleteAccount,
    getWorld
} from '../controllers/accountsController';  // Import controller functions

const router = express.Router();

// Define routes with appropriate controller functions
router.get('/accounts', getAccounts);
router.get('/accounts/:accountId', getAccount5);
router.post('/accounts', createAccount);
router.put('/accounts/:accountId', updateAccount);
router.delete('/accounts/:accountId', deleteAccount);

export default router;
