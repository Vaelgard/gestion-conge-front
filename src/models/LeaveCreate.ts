export interface LeaveCreate {
    name:string;
    reason: string;
    statut: string;
    startDate: Date;
    endDate: Date;
    userId: number;
}