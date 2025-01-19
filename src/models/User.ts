import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
    id: number;
    name: string;
    username: string;
    email: string | null;
    mobile: string | null;
    createdBy: number | null;
    dateCreated: Date | null;
    modifiedBy: number | null;
    dateLastModified: Date | null;
}