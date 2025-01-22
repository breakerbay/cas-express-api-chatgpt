import { Request, Response } from 'express';
import pool from '../config/database';
import { ChecklistGroup, NewChecklistGroup } from '../models/ChecklistGroup';
import { RowDataPacket } from 'mysql2';

// Get all checklist groups
export const getChecklistGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<ChecklistGroup[]>('SELECT * FROM checklist_groups');
        const response: ChecklistGroup[] = rows;
        res.json(response);
    } catch (error) {
        console.error('Error fetching checklist groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single checklist group by ID
export const getChecklistGroup = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query<ChecklistGroup[] & RowDataPacket[]>(
            'SELECT * FROM checklist_groups WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Checklist group not found' });
            return;
        }

        const response: ChecklistGroup = rows[0];
        res.json(response);
    } catch (error) {
        console.error('Error fetching checklist group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new checklist group
export const createChecklistGroup = async (req: Request, res: Response): Promise<void> => {
    const { name, descr } = req.body as NewChecklistGroup;

    try {
        const [result] = await pool.query(
            'INSERT INTO checklist_groups (name, descr, dateCreated) VALUES (?, ?, NOW())',
            [name, descr]
        );

        const newChecklistGroup = {
            id: (result as any).insertId,
            name,
            descr,
            createdBy: null,
            dateCreated: new Date(),
            modifiedBy: null,
            dateLastModified: null,
        } as ChecklistGroup;

        const response: ChecklistGroup = newChecklistGroup;
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating checklist group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing checklist group
export const updateChecklistGroup = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, descr, modifiedBy } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE checklist_groups SET name = ?, descr = ?, modifiedBy = ?, dateLastModified = NOW() WHERE id = ?',
            [name, descr, modifiedBy, id]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist group not found' });
            return;
        }

        const [rows] = await pool.query<ChecklistGroup[] & RowDataPacket[]>(
            'SELECT * FROM checklist_groups WHERE id = ?',
            [id]
        );

        const response: ChecklistGroup = rows[0];
        res.json(response);
    } catch (error) {
        console.error('Error updating checklist group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a checklist group
export const deleteChecklistGroup = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM checklist_groups WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist group not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting checklist group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Find checklist groups by name
export const findByChecklistGroupName = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.params;

    try {
        const [rows] = await pool.query<ChecklistGroup[] & RowDataPacket[]>(
            'SELECT * FROM checklist_groups WHERE name LIKE ?',
            [`%${query}%`]
        );

        const response: ChecklistGroup[] = rows;
        res.json(response);
    } catch (error) {
        console.error('Error searching for checklist groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};