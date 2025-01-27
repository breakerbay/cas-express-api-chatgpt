import { RowDataPacket } from 'mysql2';

export interface FollowupAction extends RowDataPacket {
    id: number;
    projectId: number;
    checkpointValueId: number;
    name: string;
    descr: string | null;
    dateRaised: Date;
    approvalToFixDone: number | null;
    dateFixed: Date | null;
    actionType: number | null;
    category: number | null;
    improvementActionFlag: number | null;
    note: string | null;
    notificationRequiredFlag: number | null;
    notificationDoneFlag: number | null;
    approvalToActionRequiredFlag: number | null;
    approvalToActionDoneFlag: number | null;
    approvalToFixRequiredFlag: number | null;
    rectificationCheckedOkFlag: number | null;
    closedOffFlag: number | null;
    dateRaisedString: string | null;
    dateFixedString: string | null;
}

export interface NewFollowupAction {
    projectId: number;
    checkpointValueId: number;
    name: string;
    descr: string | null;
    actionType: number | null;
    category: number | null;
    improvementActionFlag: number | null;
    note: string | null;
    notificationRequiredFlag: number | null;
    notificationDoneFlag: number | null;
    approvalToActionRequiredFlag: number | null;
    approvalToActionDoneFlag: number | null;
    approvalToFixRequiredFlag: number | null;
    approvalToFixDone: number | null;
    rectificationCheckedOkFlag: number | null;
    closedOffFlag: number | null;
    dateRaised: Date;
}