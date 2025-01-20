import { Request, Response } from 'express';
import pool from '../config/database';
import { Checklist } from '../models/Checklist';
import { RowDataPacket } from 'mysql2';

// Get all checklists
export const getAllChecklists = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<Checklist[]>('SELECT * FROM checklist');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching checklists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single checklist by ID
export const getChecklist = async (req: Request, res: Response): Promise<void> => {
    const { checklistId } = req.params;

    try {
        const [rows] = await pool.query<Checklist[] & RowDataPacket[]>(
            'SELECT * FROM checklist WHERE id = ?',
            [checklistId]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Checklist not found' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching checklist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new checklist
export const createChecklist = async (req: Request, res: Response): Promise<void> => {
    const {
        accountId,
        number,
        copiedFromId,
        checklistType,
        checklistGroup,
        ownerId,
        name,
        descr,
        createdBy,
    } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO checklist (accountId, number, copiedFromId, checklistType, checklistGroup, ownerId, name, descr, createdBy, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [accountId, number, copiedFromId, checklistType, checklistGroup, ownerId, name, descr, createdBy]
        );

        const newChecklist = {
            id: (result as any).insertId,
            accountId,
            number,
            copiedFromId,
            checklistType,
            checklistGroup,
            ownerId,
            name,
            descr,
            createdBy,
            dateCreated: new Date(),
            modifiedBy: null,
            dateLastModified: null,
            status: null,
        };

        res.status(201).json(newChecklist);
    } catch (error) {
        console.error('Error creating checklist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a checklist (full update)
export const updateChecklist = async (req: Request, res: Response): Promise<void> => {
    const { checklistId } = req.params;
    const {
        accountId,
        number,
        copiedFromId,
        checklistType,
        checklistGroup,
        ownerId,
        name,
        descr,
        modifiedBy,
    } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE checklist SET accountId = ?, number = ?, copiedFromId = ?, checklistType = ?, checklistGroup = ?, ownerId = ?, name = ?, descr = ?, modifiedBy = ?, dateLastModified = NOW() WHERE id = ?',
            [accountId, number, copiedFromId, checklistType, checklistGroup, ownerId, name, descr, modifiedBy, checklistId]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist not found' });
            return;
        }

        const updatedChecklist = {
            id: parseInt(checklistId, 10),
            accountId,
            number,
            copiedFromId,
            checklistType,
            checklistGroup,
            ownerId,
            name,
            descr,
            modifiedBy,
            dateLastModified: new Date(),
        };

        res.json(updatedChecklist);
    } catch (error) {
        console.error('Error updating checklist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Partially update a checklist (PATCH)
export const patchChecklist = async (req: Request, res: Response): Promise<void> => {
    const { checklistId } = req.params;
    const updates = req.body;

    try {
        let updateQuery = 'UPDATE checklist SET ';
        const updateParams: any[] = [];

        Object.keys(updates).forEach((key, index) => {
            updateQuery += `${key} = ?, `;
            updateParams.push(updates[key]);
        });

        updateQuery += 'modifiedBy = ?, dateLastModified = NOW() WHERE id = ?';
        updateParams.push(updates.modifiedBy || null, checklistId);

        const [result] = await pool.query(updateQuery, updateParams);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist not found' });
            return;
        }

        const [rows] = await pool.query<Checklist[] & RowDataPacket[]>(
            'SELECT * FROM checklist WHERE id = ?',
            [checklistId]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error('Error patching checklist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a checklist
export const deleteChecklist = async (req: Request, res: Response): Promise<void> => {
    const { checklistId } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM checklist WHERE id = ?', [checklistId]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checklist not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting checklist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};