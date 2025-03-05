export interface LeaveRequest {
    id:number,
    name:string;
    reason: string;
    rejectionreason: string;
    statut: string;
    startDate: Date;
    endDate: Date;
    userId: number;
}