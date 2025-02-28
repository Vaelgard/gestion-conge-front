import  { useEffect, useState } from "react";
import UserService from "@/services/userService";
import { LeaveRequest } from "@/models/LeaveRequest";


export default function LeavesApprovePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const data = await UserService.getLeave();
        if (data) {
          setRequests(
            data.filter((leave: LeaveRequest)=>leave.statut==="Approved").map((leave: LeaveRequest) => ({
              id: leave.id,
              name: leave.name,
              startDate: leave.startDate,
              endDate: leave.endDate,
              reason: leave.reason,
              statut: leave.statut,
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
      <h1 className="text-2xl font-bold mb-4">
        Accepter une demande de congé
      </h1>
      {requests.length === 0 ? (
        <p>Aucune demande en attente.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{req.name}</p>
                <p>
                  {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                </p>
                <p>Raison: {req.reason}</p>
              </div>
                <span className="text-green-600 font-bold">Approuvé</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
