export interface LeaveRequest {
    id:number,
    name:string;
    reason: string;
    statut: string;
    startDate: Date;
    endDate: Date;
    userId: number;
}