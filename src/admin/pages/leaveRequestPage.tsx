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

export default function LeavesRequestsPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Define fetchLeaveRequests outside of useEffect so it can be used elsewhere.
  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const data = await UserService.getLeave();
      if (data) {
        setLeaveRequests(
          data
            .filter((leave: LeaveRequest) => leave.statut === "Pending")
            .map((leave: LeaveRequest) => ({
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
      setMessage("Failed to fetch leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await UserService.approveLeave(id);
      setMessage("Leave request approved successfully.");
      fetchLeaveRequests();
    } catch (error) {
      console.error("Failed to approve leave", error);
      setMessage("Failed to approve leave.");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await UserService.rejectLeave(id);
      setMessage("Leave request rejected successfully.");
      fetchLeaveRequests();
    } catch (error) {
      console.error("Failed to reject leave", error);
      setMessage("Failed to reject leave.");
    }
  };

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
            <TableHead>Nom de l'employé</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Action</TableHead>
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
                <TableCell>{request.name}</TableCell>
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
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approuver
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => handleReject(request.id)}
                    >
                      Refuser
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
