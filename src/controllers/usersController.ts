import { Request, Response } from 'express';
import pool from '../config/database';
import { User } from '../models/User';
import { RowDataPacket } from 'mysql2';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<User[]>('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const [rows] = await pool.query<User[] & RowDataPacket[]>(
            'SELECT * FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, username, email, mobile, createdBy } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO users (name, username, email, mobile, createdBy, dateCreated) VALUES (?, ?, ?, ?, ?, NOW())',
            [name, username, email, mobile, createdBy]
        );

        const newUser = {
            id: (result as any).insertId,
            name,
            username,
            email,
            mobile,
            createdBy,
            dateCreated: new Date(),
            modifiedBy: null,
            dateLastModified: null,
        };

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user (full update)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { name, username, email, mobile, modifiedBy } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE users SET name = ?, username = ?, email = ?, mobile = ?, modifiedBy = ?, dateLastModified = NOW() WHERE id = ?',
            [name, username, email, mobile, modifiedBy, userId]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const updatedUser = {
            id: parseInt(userId, 10),
            name,
            username,
            email,
            mobile,
            modifiedBy,
            dateLastModified: new Date(),
        };

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Partially update a user (PATCH)
export const patchUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        let updateQuery = 'UPDATE users SET ';
        const updateParams: any[] = [];

        Object.keys(updates).forEach((key, index) => {
            updateQuery += `${key} = ?, `;
            updateParams.push(updates[key]);
        });

        updateQuery += 'modifiedBy = ?, dateLastModified = NOW() WHERE id = ?';
        updateParams.push(updates.modifiedBy || null, userId);

        const [result] = await pool.query(updateQuery, updateParams);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const [rows] = await pool.query<User[] & RowDataPacket[]>(
            'SELECT * FROM users WHERE id = ?',
            [userId]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error('Error patching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};