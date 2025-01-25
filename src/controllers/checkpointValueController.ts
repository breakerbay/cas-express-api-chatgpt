// src/controllers/checkpointValueController.ts
import { Request, Response } from 'express';
import pool from '../config/database';
import { CheckpointValue } from '../models/CheckpointValue';

// Get all checkpoint values (deprecated)
export const getCheckpointvalues = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query('SELECT * FROM checkpointvalue LIMIT 10');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving checkpoint values', error });
    }
};

// Get a specific checkpoint value by ID
export const getCheckpointvalue = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const [rows] = await pool.query('SELECT * FROM checkpointvalue WHERE id = ?', [id]);
        const checkpointValue = (rows as CheckpointValue[])[0];
        if (checkpointValue) {
            res.status(200).json(checkpointValue);
        } else {
            res.status(404).json({ message: 'CheckpointValue not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving checkpoint value', error });
    }
};


// Delete a checkpoint value
export const deleteCheckpointvalue = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query('DELETE FROM checkpointvalue WHERE id = ?', [id]);
        if ((result as any).affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'CheckpointValue not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting checkpoint value', error });
    }
};

// Create a new checkpoint value
export const createCheckpointvalue = async (req: Request, res: Response) => {

    try {
        const newCheckpointValue: CheckpointValue = req.body;

        const query = `
            INSERT INTO checkpointvalue (
                checkpointId, workareaId, checkerId, member_id, dateChecked, status,
                milestoneStatus, note, dateCheckedString, locationLatitude, locationLongitude,
                checkedLatitude, checkedLongitude, location, checkedLocation, milestoneId, checkerName
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            newCheckpointValue.checkpointId,
            newCheckpointValue.workareaId,
            newCheckpointValue.checkerId,
            newCheckpointValue.member_id,
            newCheckpointValue.dateChecked,
            newCheckpointValue.status,
            newCheckpointValue.milestoneStatus,
            newCheckpointValue.note,
            newCheckpointValue.dateCheckedString,
            newCheckpointValue.locationLatitude,
            newCheckpointValue.locationLongitude,
            newCheckpointValue.checkedLatitude,
            newCheckpointValue.checkedLongitude,
            newCheckpointValue.location,
            newCheckpointValue.checkedLocation,
            newCheckpointValue.milestoneId,
            newCheckpointValue.checkerName
        ];

        const [result] = await pool.query(query, values);
        const insertId = (result as any).insertId;

        newCheckpointValue.id = insertId;

        res.status(201).json({ ...newCheckpointValue });
    } catch (error) {
        res.status(500).json({ message: 'Error creating checkpoint value', error });
    }
};

// Update an existing checkpoint value
export const updateCheckpointvalue = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedCheckpointValue: CheckpointValue = req.body;

        const query = `
            UPDATE checkpointvalue SET
                checkpointId = ?,
                workareaId = ?,
                checkerId = ?,
                member_id = ?,
                dateChecked = ?,
                status = ?,
                milestoneStatus = ?,
                note = ?,
                dateCheckedString = ?,
                locationLatitude = ?,
                locationLongitude = ?,
                checkedLatitude = ?,
                checkedLongitude = ?,
                location = ?,
                checkedLocation = ?,
                milestoneId = ?,
                checkerName = ?
            WHERE id = ?
        `;

        const values = [
            updatedCheckpointValue.checkpointId,
            updatedCheckpointValue.workareaId,
            updatedCheckpointValue.checkerId,
            updatedCheckpointValue.member_id,
            updatedCheckpointValue.dateChecked,
            updatedCheckpointValue.status,
            updatedCheckpointValue.milestoneStatus,
            updatedCheckpointValue.note,
            updatedCheckpointValue.dateCheckedString,
            updatedCheckpointValue.locationLatitude,
            updatedCheckpointValue.locationLongitude,
            updatedCheckpointValue.checkedLatitude,
            updatedCheckpointValue.checkedLongitude,
            updatedCheckpointValue.location,
            updatedCheckpointValue.checkedLocation,
            updatedCheckpointValue.milestoneId,
            updatedCheckpointValue.checkerName,
            updatedCheckpointValue.id
        ];

        const [result] = await pool.query(query, values);
        if ((result as any).affectedRows > 0) {
            res.status(200).json({ ...updatedCheckpointValue });
        } else {
            res.status(404).json({ message: 'CheckpointValue not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating checkpoint value', error });
    }
};

