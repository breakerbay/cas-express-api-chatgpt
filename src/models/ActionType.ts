import { RowDataPacket } from 'mysql2';

// Interface for database rows
export interface ActionType extends RowDataPacket {
    id: number;
    name: string | null;
    descr: string | null;
}

// Interface for creating new action types
export interface NewActionType {
    name: string | null;
    descr: string | null;
}

export interface ActionTypeRequest {
    Data: NewActionType[];
}

export interface ActionTypeResponse {
    Data: ActionType[];
}