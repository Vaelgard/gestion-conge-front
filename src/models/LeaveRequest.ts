export interface LeaveRequest {
    id: number;
    reason: string;
    name:string;
    statut: string;
    startDate: Date;
    endDate: Date;
    userId: number;
}