import { RowDataPacket } from 'mysql2';

export interface Checkpoint extends RowDataPacket {
    id: number;
    copiedFromId: number | null;
    checkpointType: 1 | 2 | 3 | 4; // Enum: 1 (Standard), 2 (Hold Point), 3 (Criteria Point), 4 (Clarification Required)
    parentId: number | null;
    checklistId: number | null;
    milestoneId: number | null;
    position: number | null;
    name: string | null;
    descr: string | null;
    label: string | null;
    checkpoints: CriteriaPoint[] | null; // Array of CriteriaPoint
    createdBy: number | null;
    dateCreated: Date | null;
    modifiedBy: number | null;
    dateLastModified: Date | null;
}

export interface CriteriaPoint extends RowDataPacket {
    id: number;
    copiedFromId: number | null;
    checkpointType: 3; // Fixed value for CriteriaPoint
    parentId: number;
    checklistId: number | null;
    milestoneId: number | null;
    position: number | null;
    name: string;
    descr: string | null;
    label: string | null;
    createdBy: number | null;
    dateCreated: Date | null;
    modifiedBy: number | null;
    dateLastModified: Date | null;
}
