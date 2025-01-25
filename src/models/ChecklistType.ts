import { RowDataPacket } from 'mysql2';

export interface ChecklistType extends RowDataPacket {
    id: number;
    name: string | null;
    descr: string | null;
}
