import { RowDataPacket } from 'mysql2';

export interface ActionCategory extends RowDataPacket {
    id: number;
    name: string | null;
    descr: string | null;
}

export interface NewActionCategory {
    name: string | null;
    descr: string | null;
}