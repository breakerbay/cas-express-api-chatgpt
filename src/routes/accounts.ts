import express from 'express';
import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../controllers/accountsController';

const router = express.Router();

router.get('/accounts', getAccounts);
router.post('/accounts', createAccount);
router.put('/accounts/:accountId', updateAccount);
router.delete('/accounts/:accountId', deleteAccount);
router.get('/accounts/:accountId', getAccount);

export default router;
