import { Request, Response } from 'express';
import pool from '../config/database';
import { ActionType, NewActionType, ActionTypeRequest, ActionTypeResponse} from '../models/ActionType';
import { RowDataPacket } from 'mysql2';

// Get all action types
export const getActionTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<ActionType[]>('SELECT * FROM actiontype');
        const response: ActionTypeResponse = { Data: rows };
        res.json(response);
    } catch (error) {
        console.error('Error fetching action types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single action type by ID
export const getActionType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query<ActionType[] & RowDataPacket[]>(
            'SELECT * FROM actiontype WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Action type not found' });
            return;
        }

        const response: ActionTypeResponse = { Data: rows };
        res.json(response);
    } catch (error) {
        console.error('Error fetching action type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create new action types
export const createActionType = async (req: Request, res: Response): Promise<void> => {
    const { Data } = req.body as ActionTypeRequest;

    try {
        const newActionTypes: ActionType[] = [];

        for (const actionType of Data) {
            const [result] = await pool.query(
                'INSERT INTO actiontype (name, descr) VALUES (?, ?)',
                [actionType.name, actionType.descr]
            );

            // Explicitly cast the new object to ActionType
            const newActionType: ActionType = {
                id: (result as any).insertId, // Insert ID from the database
                name: actionType.name,
                descr: actionType.descr,
            } as ActionType;

            newActionTypes.push(newActionType);
        }

        const response: ActionTypeResponse = { Data: newActionTypes };
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating action types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Search for action types by name
export const findActionTypeByName = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.params;

    try {
        const [rows] = await pool.query<ActionType[] & RowDataPacket[]>(
            'SELECT * FROM actiontype WHERE name LIKE ?',
            [`%${query}%`]
        );

        const response: ActionTypeResponse = { Data: rows };
        res.json(response);
    } catch (error) {
        console.error('Error searching for action types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};