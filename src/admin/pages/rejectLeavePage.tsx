import { useEffect, useState } from "react";
import { LeaveRequest } from "@/models/LeaveRequest";
import UserService from "@/services/userService";

export default function LeavesRejectPage() {
  const [leaverequests, setleaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const data = await UserService.getLeave();
        
        if (data) {
          setleaveRequests(
            data.filter((leave: LeaveRequest) => leave.statut === "Rejected").map((leave: LeaveRequest) => ({
              id: leave.id,
              name: leave.name,
              startDate: leave.startDate,
              endDate: leave.endDate,
              reason: leave.reason,
              rejectionreason: leave.rejectionreason,
              status: leave.statut,
              userId: leave.userId,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch leave requests", error);
      }
    };
    fetchLeaveRequests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Refuser une demande de congé</h1>
      {leaverequests.length === 0 ? (
        <p>Aucune demande en attente.</p>
      ) : (
        <div className="space-y-4">
          {leaverequests.map((req) => (
            <div key={req.id} className="p-4 border rounded-lg">
              <div className="mb-2">
                <p className="font-bold">{req.name}</p>
                <p>
                  {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                </p>
                <p>Raison de congé: {req.reason}</p>
                <p>Motif de refus: {req.rejectionreason}</p>
              </div>
              <span className="text-red-600 font-bold">Refusé</span>    
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
