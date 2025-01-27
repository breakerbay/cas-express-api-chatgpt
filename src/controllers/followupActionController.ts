import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { FollowupAction, NewFollowupAction } from '../models/FollowupAction';

// Get all followup actions
export const getFollowupActions = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<FollowupAction[]>('SELECT * FROM followupaction');
        res.json(rows); // Return the array of followup actions
    } catch (error) {
        console.error('Error fetching followup actions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific followup action by ID
export const getFollowupAction = async (req: Request, res: Response): Promise<void> => {
    const { followupactionId } = req.params;

    try {
        const [rows] = await pool.query<FollowupAction[] & RowDataPacket[]>(
            'SELECT * FROM followupaction WHERE id = ?',
            [followupactionId]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Followup action not found' });
            return;
        }

        res.json(rows[0]); // Return the followup action
    } catch (error) {
        console.error('Error fetching followup action:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add a new followup action
export const addFollowupAction = async (req: Request, res: Response): Promise<void> => {
    const { accountId, checkerId, checkpointvalueId } = req.params;
    const {
        projectId,
        checkpointValueId,
        name,
        descr,
        actionType,
        category,
        improvementActionFlag,
        note,
        notificationRequiredFlag,
        notificationDoneFlag,
        approvalToActionRequiredFlag,
        approvalToActionDoneFlag,
        approvalToFixRequiredFlag,
        approvalToFixDone,
        rectificationCheckedOkFlag,
        closedOffFlag,
        dateRaised,
    } = req.body as NewFollowupAction;

    try {
        const [result] = await pool.query(
            'INSERT INTO followupaction (projectId, checkpointValueId, name, descr, actionType, category, improvementActionFlag, note, notificationRequiredFlag, notificationDoneFlag, approvalToActionRequiredFlag, approvalToActionDoneFlag, approvalToFixRequiredFlag, approvalToFixDone, rectificationCheckedOkFlag, closedOffFlag, dateRaised) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                projectId,
                checkpointValueId,
                name,
                descr,
                actionType,
                category,
                improvementActionFlag,
                note,
                notificationRequiredFlag,
                notificationDoneFlag,
                approvalToActionRequiredFlag,
                approvalToActionDoneFlag,
                approvalToFixRequiredFlag,
                approvalToFixDone,
                rectificationCheckedOkFlag,
                closedOffFlag,
                dateRaised,
            ]
        );

        const newFollowupAction = {
            id: (result as any).insertId,
            projectId,
            checkpointValueId,
            name,
            descr,
            dateRaised,
            approvalToFixDone,
            dateFixed: null,
            actionType,
            category,
            improvementActionFlag,
            note,
            notificationRequiredFlag,
            notificationDoneFlag,
            approvalToActionRequiredFlag,
            approvalToActionDoneFlag,
            approvalToFixRequiredFlag,
            rectificationCheckedOkFlag,
            closedOffFlag,
            dateRaisedString: null,
            dateFixedString: null,
        } as FollowupAction;

        res.status(201).json(newFollowupAction); // Return the newly created followup action
    } catch (error) {
        console.error('Error creating followup action:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing followup action
export const updateFollowupAction = async (req: Request, res: Response): Promise<void> => {
    const { followupactionId } = req.params;
    const {
        projectId,
        checkpointValueId,
        name,
        descr,
        actionType,
        category,
        improvementActionFlag,
        note,
        notificationRequiredFlag,
        notificationDoneFlag,
        approvalToActionRequiredFlag,
        approvalToActionDoneFlag,
        approvalToFixRequiredFlag,
        approvalToFixDone,
        rectificationCheckedOkFlag,
        closedOffFlag,
        dateRaised,
    } = req.body as NewFollowupAction;

    try {
        const [result] = await pool.query(
            'UPDATE followupaction SET projectId = ?, checkpointValueId = ?, name = ?, descr = ?, actionType = ?, category = ?, improvementActionFlag = ?, note = ?, notificationRequiredFlag = ?, notificationDoneFlag = ?, approvalToActionRequiredFlag = ?, approvalToActionDoneFlag = ?, approvalToFixRequiredFlag = ?, approvalToFixDone = ?, rectificationCheckedOkFlag = ?, closedOffFlag = ?, dateRaised = ? WHERE id = ?',
            [
                projectId,
                checkpointValueId,
                name,
                descr,
                actionType,
                category,
                improvementActionFlag,
                note,
                notificationRequiredFlag,
                notificationDoneFlag,
                approvalToActionRequiredFlag,
                approvalToActionDoneFlag,
                approvalToFixRequiredFlag,
                approvalToFixDone,
                rectificationCheckedOkFlag,
                closedOffFlag,
                dateRaised,
                followupactionId,
            ]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Followup action not found' });
            return;
        }

        const [rows] = await pool.query<FollowupAction[] & RowDataPacket[]>(
            'SELECT * FROM followupaction WHERE id = ?',
            [followupactionId]
        );

        res.json(rows[0]); // Return the updated followup action
    } catch (error) {
        console.error('Error updating followup action:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a followup action
export const deleteFollowupAction = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM followupaction WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Followup action not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting followup action:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};