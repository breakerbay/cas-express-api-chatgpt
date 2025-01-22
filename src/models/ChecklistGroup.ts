import { RowDataPacket } from 'mysql2';

export interface ChecklistGroup extends RowDataPacket {
    id: number;
    name: string;
    descr: string | null;
    createdBy: number | null;
    dateCreated: Date | null;
    modifiedBy: number | null;
    dateLastModified: Date | null;
}

export interface NewChecklistGroup {
    name: string;
    descr: string | null;
}

export interface ChecklistGroupArray {
    Data: ChecklistGroup[];
}