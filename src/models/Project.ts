import { RowDataPacket } from 'mysql2';

export interface Project extends RowDataPacket {
    id: number;
    accountId: number;
    number: number;
    name: string;
    descr: string | null;
    statusId: number | null;
    status: number | null;
    milestoneStatus: number | null;
    place_number: number | null;
    createdBy: number | null;
    datecreated: Date | null;
    modifiedBy: number | null;
    datelastModified: Date | null;
}