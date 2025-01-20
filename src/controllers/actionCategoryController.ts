import { Request, Response } from 'express';
import pool from '../config/database';
import { ActionCategory, NewActionCategory } from '../models/ActionCategory';
import { RowDataPacket } from 'mysql2';

// Get all action categories
export const getActionCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<ActionCategory[]>('SELECT * FROM actioncategory');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching action categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single action category by ID
export const getActionCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query<ActionCategory[] & RowDataPacket[]>(
            'SELECT * FROM actioncategory WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Action category not found' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching action category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new action category
export const createActionCategory = async (req: Request, res: Response): Promise<void> => {
    const { name, descr } = req.body as NewActionCategory;

    try {
        const [result] = await pool.query(
            'INSERT INTO actioncategory (name, descr) VALUES (?, ?)',
            [name, descr]
        );

        const newActionCategory = {
            id: (result as any).insertId,
            name,
            descr,
        };

        res.status(201).json(newActionCategory);
    } catch (error) {
        console.error('Error creating action category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing action category
export const updateActionCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, descr } = req.body as NewActionCategory;

    try {
        const [result] = await pool.query(
            'UPDATE actioncategory SET name = ?, descr = ? WHERE id = ?',
            [name, descr, id]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Action category not found' });
            return;
        }

        const updatedActionCategory = {
            id: parseInt(id, 10),
            name,
            descr,
        };

        res.json(updatedActionCategory);
    } catch (error) {
        console.error('Error updating action category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an action category
export const deleteActionCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM actioncategory WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Action category not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting action category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Search for action categories by name
export const findActionCategoryByName = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.params;

    try {
        const [rows] = await pool.query<ActionCategory[] & RowDataPacket[]>(
            'SELECT * FROM actioncategory WHERE name LIKE ?',
            [`%${query}%`]
        );

        res.json(rows);
    } catch (error) {
        console.error('Error searching for action categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};