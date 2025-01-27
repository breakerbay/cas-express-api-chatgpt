import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { Checkpoint, CriteriaPoint } from '../models/Checkpoint';

// Get all checkpoints
export const getCheckpoints = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<Checkpoint[]>('SELECT * FROM checkpoint LIMIT 30');
        res.json(rows); // Return the array of checkpoints
    } catch (error) {
        console.error('Error fetching checkpoints:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific checkpoint by ID
export const getCheckpoint = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Fetch the checkpoint
        const [checkpointRows] = await pool.query<Checkpoint[] & RowDataPacket[]>(
            'SELECT * FROM checkpoint WHERE id = ?',
            [id]
        );

        if (checkpointRows.length === 0) {
            res.status(404).json({ message: 'Checkpoint not found' });
            return;
        }

        const checkpoint = checkpointRows[0];

        // Fetch associated criteria points
        const [criteriaRows] = await pool.query<CriteriaPoint[] & RowDataPacket[]>(
            'SELECT * FROM checkpoint WHERE parentId = ?',
            [id]
        );

        checkpoint.checkpoints = criteriaRows;

        res.json(checkpoint);
    } catch (error) {
        console.error('Error fetching checkpoint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new checkpoint
export const createCheckpoint = async (req: Request, res: Response): Promise<void> => {
    const {
        copiedFromId,
        checkpointType,
        parentId,
        checklistId,
        milestoneId,
        position,
        name,
        descr,
        label,
        createdBy,
    } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO checkpoint (copiedFromId, checkpointType, parentId, checklistId, milestoneId, position, name, descr, label, createdBy, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                copiedFromId,
                checkpointType,
                parentId,
                checklistId,
                milestoneId,
                position,
                name,
                descr,
                label,
                createdBy,
            ]
        );

        const newCheckpoint = {
            id: (result as any).insertId,
            copiedFromId,
            checkpointType,
            parentId,
            checklistId,
            milestoneId,
            position,
            name,
            descr,
            label,
            createdBy,
            dateCreated: new Date(),
            modifiedBy: null,
            dateLastModified: null,
        } as Checkpoint;

        res.status(201).json(newCheckpoint); // Return the newly created checkpoint
    } catch (error) {
        console.error('Error creating checkpoint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing checkpoint
export const updateCheckpoint = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        copiedFromId,
        checkpointType,
        parentId,
        checklistId,
        milestoneId,
        position,
        name,
        descr,
        label,
        modifiedBy,
    } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE checkpoint SET copiedFromId = ?, checkpointType = ?, parentId = ?, checklistId = ?, milestoneId = ?, position = ?, name = ?, descr = ?, label = ?, modifiedBy = ?, dateLastModified = NOW() WHERE id = ?',
            [
                copiedFromId,
                checkpointType,
                parentId,
                checklistId,
                milestoneId,
                position,
                name,
                descr,
                label,
                modifiedBy,
                id,
            ]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checkpoint not found' });
            return;
        }

        const [rows] = await pool.query<Checkpoint[] & RowDataPacket[]>(
            'SELECT * FROM checkpoint WHERE id = ?',
            [id]
        );

        res.json(rows[0]); // Return the updated checkpoint
    } catch (error) {
        console.error('Error updating checkpoint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a checkpoint
export const deleteCheckpoint = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM checkpoint WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Checkpoint not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting checkpoint:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};