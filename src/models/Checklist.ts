import { RowDataPacket } from 'mysql2';

export interface Checklist extends RowDataPacket {
    id: number;
    accountId: number | null;
    number: number | null;
    copiedFromId: number | null;
    checklistType: number | null;
    checklistGroup: number | null;
    ownerId: number | null;
    name: string | null;
    descr: string | null;
    createdBy: number | null;
    dateCreated: Date | null;
    modifiedBy: number | null;
    dateLastModified: Date | null;
    status: number | null;
}