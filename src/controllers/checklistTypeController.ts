// src/controllers/checklistTypeController.ts
import { Request, Response } from 'express';
import pool from '../config/database';
import { ChecklistType} from '../models/ChecklistType';
import { RowDataPacket } from 'mysql2';

// Get all checklist types
export const getChecklistTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<ChecklistType[]>('SELECT * FROM checklist_types');
        const response: ChecklistType[] = rows;
        res.json(response);
    } catch (error) {
        console.error('Error fetching checklist groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single checklist group by ID
export const getChecklistType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query<ChecklistType[] & RowDataPacket[]>(
            'SELECT * FROM checklist_types WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Checklist group not found' });
            return;
        }

        const response: ChecklistType = rows[0];
        res.json(response);
    } catch (error) {
        console.error('Error fetching checklist group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing checklist type
export const updateChecklistType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, descr, modifiedBy } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE checklist_types SET name = ?, descr = ?, modifiedBy = ?, dateLastModified = NOW() WHERE id = ?',
            [name, descr, modifiedBy, id]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist type not found' });
            return;
        }

        const [rows] = await pool.query<ChecklistType[] & RowDataPacket[]>(
            'SELECT * FROM checklist_types WHERE id = ?',
            [id]
        );

        const response: ChecklistType = rows[0];
        res.json(response);
    } catch (error) {
        console.error('Error updating checklist type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a checklist type
export const deleteChecklistType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM checklist_types WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist type not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting checklist type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};