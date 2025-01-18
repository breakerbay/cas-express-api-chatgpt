import {RowDataPacket} from "mysql2";

export interface Account extends RowDataPacket {
    id: number;
    user_id: number;
    type_id: number;
    plan_id: number;
    name: string;
    descr: string;
    dateCreated: Date;
    dateLastModified: Date;
}

export interface NewAccount {
    user_id: number;
    type_id: number;
    plan_id: number;
    name: string;
    descr: string;
    createdBy: number;
}
