import { Request, Response } from 'express';
import pool from '../config/database';
import { Account, NewAccount } from '../models/Account';
import { RowDataPacket } from 'mysql2';  // Import RowDataPacket

export const getWorld = async (req: Request, res: Response) => {
    const { id } = req.params; // Retrieve the path parameter `id`

    console.log(`accountID: ${id}`);

    const message = `Hello from World ${id}`; // Construct the message
    res.json({ message }); // Send the response as JSON
};

// Get all accounts
export const getAccounts = async (req: Request, res: Response) => {
    try {
        // Explicitly type the result as an array of RowDataPacket (representing Account[])
        const [accounts]: [RowDataPacket[], any] = await pool.query('SELECT * FROM accounts');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAccount4 = async (req: Request, res: Response) => {
    const { accountId } = req.params;

    const sql = `SELECT * FROM accounts WHERE id = ${accountId}`;
    const [accounts] = await pool.execute<Account[]>(sql);



    if (accounts.length === 0) {
        return res.status(404).json({ error: 'Account not found' });
    }
    const account: Account  = accounts[0];
    res.json(account.toString());  // Now TypeScript understands the structure
    res.status(200).send();

    return account;
}

// Get account by ID
export const getAccount = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    try {
        // Explicitly type the result as an array of RowDataPacket (representing Account[])
        const [accounts]: [Account[], any] = await pool.query('SELECT * FROM accounts WHERE id = ?', [accountId]);

        if (accounts.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const account: Account  = accounts[0];


        res.json(account);  // Now TypeScript understands the structure
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new account
export const createAccount = async (req: Request, res: Response) => {
    const { user_id, type_id, plan_id, name, descr, createdBy }: NewAccount = req.body;
    try {
        await pool.query(
            'INSERT INTO accounts (user_id, type_id, plan_id, name, descr, createdBy, dateCreated) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [user_id, type_id, plan_id, name, descr, createdBy]
        );
        res.status(201).json({ message: 'Account created' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an account
export const updateAccount = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { type_id, plan_id, name, descr, modifiedBy } = req.body;
    try {
        await pool.query(
            'UPDATE accounts SET type_id = ?, plan_id = ?, name = ?, descr = ?, modifiedBy = ?, dateLastModified = NOW() WHERE id = ?',
            [type_id, plan_id, name, descr, modifiedBy, accountId]
        );
        res.json({ message: 'Account updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an account
export const deleteAccount = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    try {
        await pool.query('DELETE FROM accounts WHERE id = ?', [accountId]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an account
export const getAccount2 = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    try {
        await pool.query('DELETE FROM accounts WHERE id = ?', [accountId]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get account by ID
export const getAccount3 = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    try {
        // Explicitly type the result as an array of RowDataPacket (representing Account[])
        const [accounts]: [RowDataPacket[], any] = await pool.query('SELECT * FROM accounts WHERE id = ?', [accountId]);

        if (accounts.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(accounts[0]);  // Now TypeScript understands the structure
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAccount5 = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.params; // Retrieve the accountId path parameter

    try {
        // Query the database for the account record
        const [rows] = await pool.query<Account[] & RowDataPacket[]>(
            'SELECT * FROM accounts WHERE id = ?',
            [accountId]
        );

        // Check if the account was found
        if (rows.length === 0) {
            res.status(404).json({ message: 'Account not found' });
            return; // Exit the function after sending the response
        }

        // Return the account record as JSON
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};