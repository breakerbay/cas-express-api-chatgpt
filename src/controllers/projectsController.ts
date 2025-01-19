import { Request, Response } from 'express';
import pool from '../config/database';
import { Project } from '../models/Project';
import { RowDataPacket } from 'mysql2';

// Get all projects
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await pool.query<Project[]>('SELECT * FROM project');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single project by ID
export const getProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;

    try {
        const [rows] = await pool.query<Project[] & RowDataPacket[]>(
            'SELECT * FROM project WHERE id = ?',
            [projectId]
        );

        if (rows.length === 0) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
    const {
        accountId,
        number,
        name,
        descr,
        statusId,
        status,
        milestoneStatus,
        place_number,
        createdBy,
    } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO project (accountId, number, name, descr, statusId, status, milestoneStatus, place_number, createdBy, datecreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [accountId, number, name, descr, statusId, status, milestoneStatus, place_number, createdBy]
        );

        const newProject = {
            id: (result as any).insertId,
            accountId,
            number,
            name,
            descr,
            statusId,
            status,
            milestoneStatus,
            place_number,
            createdBy,
            datecreated: new Date(),
            modifiedBy: null,
            datelastModified: null,
        };

        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a project (full update)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const {
        accountId,
        number,
        name,
        descr,
        statusId,
        status,
        milestoneStatus,
        place_number,
        modifiedBy,
    } = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE project SET accountId = ?, number = ?, name = ?, descr = ?, statusId = ?, status = ?, milestoneStatus = ?, place_number = ?, modifiedBy = ?, datelastModified = NOW() WHERE id = ?',
            [accountId, number, name, descr, statusId, status, milestoneStatus, place_number, modifiedBy, projectId]
        );

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        const updatedProject = {
            id: parseInt(projectId, 10),
            accountId,
            number,
            name,
            descr,
            statusId,
            status,
            milestoneStatus,
            place_number,
            modifiedBy,
            datelastModified: new Date(),
        };

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Partially update a project (PATCH)
export const patchProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const updates = req.body;

    try {
        let updateQuery = 'UPDATE projects SET ';
        const updateParams: any[] = [];

        Object.keys(updates).forEach((key, index) => {
            updateQuery += `${key} = ?, `;
            updateParams.push(updates[key]);
        });

        updateQuery += 'modifiedBy = ?, datelastModified = NOW() WHERE id = ?';
        updateParams.push(updates.modifiedBy || null, projectId);

        const [result] = await pool.query(updateQuery, updateParams);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        const [rows] = await pool.query<Project[] & RowDataPacket[]>(
            'SELECT * FROM project WHERE id = ?',
            [projectId]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error('Error patching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM project WHERE id = ?', [projectId]);

        if ((result as any).affectedRows === 0) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};