// src/models/CheckpointValue.ts
export interface CheckpointValue {
    id: number;
    checkpointId: number | null;
    workareaId: number | null;
    checkerId: number | null;
    member_id: number | null;
    dateChecked: string | null;
    status: string | null;
    milestoneStatus: number | null;
    note: string;
    dateCheckedString: string | null;
    locationLatitude: number | null;
    locationLongitude: number | null;
    checkedLatitude: number | null;
    checkedLongitude: number | null;
    location: string | null;
    checkedLocation: string | null;
    milestoneId: number | null;
    checkerName: string | null;
}