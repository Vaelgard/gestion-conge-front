import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from "@/components/ui/table";
  import { LeaveRequest } from "@/models/LeaveRequest";
  import UserService from "@/services/userService";
  import { useEffect, useState } from "react";
  
  export default function LeavesStatusPage() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
  
    // Define fetchLeaveRequests outside of useEffect so it can be used elsewhere.
    const fetchLeaveRequests = async () => {
      setLoading(true);
      try {
        const user = await UserService.getUser();
        const userId = user?.ourUsers?.id;
        const data = await UserService.getLeaveByUser(userId);
        console.log(data);
        if (data) {
          setLeaveRequests(
            data.map((leave: LeaveRequest) => ({
                id: leave.id,
                startDate: leave.startDate,
                endDate: leave.endDate,
                reason: leave.reason,
                rejectionreason: leave.rejectionreason,
                statut: leave.statut,
              }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch leave requests", error);
        setMessage("Failed to fetch leave requests.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchLeaveRequests();
    }, []);
  
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Consulter les demandes de congé
        </h1>
        {message && (
          <div className="mb-4 p-2 text-center text-white bg-blue-500 rounded-lg">
            {message}
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date de début</TableHead>
              <TableHead>Date de fin</TableHead>
              <TableHead>Raison de congé</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Motif</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Chargement des demandes de congé...
                </TableCell>
              </TableRow>
            ) : (
              leaveRequests.map((request) => (
                <TableRow key={request.id}>
                <TableCell>
                  {new Date(request.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(request.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>
                  <button
                    className={`rounded-full px-3 py-1 text-white font-semibold transition-colors duration-200 ${
                      request.statut === "Approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : request.statut === "Rejected"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
                    {request.statut}
                  </button>
                </TableCell>
                {request.rejectionreason != null ? (
                  <TableCell>{request.rejectionreason}</TableCell>
                ) : (
                  <TableCell>Votre demande a été approuvée !</TableCell>
                )}
              </TableRow>   
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
  