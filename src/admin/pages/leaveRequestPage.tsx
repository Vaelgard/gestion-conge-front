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
import Modal from "@/common/Modal"; // Import du modal
import { Input } from "@/components/ui/input"; // Import d'un input si besoin

export default function LeavesRequestsPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  //New state for the rejection modal
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
  const [leaveRequestToReject, setLeaveRequestToReject] = useState<LeaveRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const data: LeaveRequest[] = await UserService.getLeave();
      if (data) {
        const pendingLeaves = data.filter(
          (leave: LeaveRequest) => leave.statut === "Pending"
        );
        setLeaveRequests(pendingLeaves);
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
      setMessage("La demande de congé a été approuvée avec succès.");
      fetchLeaveRequests();
    } catch (error) {
      console.error("Failed to approve leave", error);
      setMessage("Failed to approve leave.");
    }
  };

  // Open rejection Model
  const handleOpenRejectModal = (request: LeaveRequest) => {
    setLeaveRequestToReject(request);
    setRejectModalOpen(true);
  };

  // Submit rejection with reason
  const onRejectSubmit = async () => {
    if (!leaveRequestToReject) return;
    if (!rejectionReason.trim()) {
      alert("Veuillez saisir le motif du refus.");
      return;
    }
    try {
      const updatedLeaveRequest: LeaveRequest = {
        ...leaveRequestToReject,
        rejectionreason: rejectionReason,
        statut: "Rejected",
      };
      await UserService.rejectLeave(updatedLeaveRequest);
      setMessage("La demande de congé a été rejetée avec succès.");
      fetchLeaveRequests();
      // Reset the model 
      setRejectModalOpen(false);
      setLeaveRequestToReject(null);
      setRejectionReason("");
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
                      onClick={() => handleOpenRejectModal(request)}
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

      {/* Modal de refus pour spécifier le motif */}
      {rejectModalOpen && leaveRequestToReject && (
        <Modal isOpen={rejectModalOpen} onClose={() => setRejectModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Refuser la demande de congé</h2>
          <div className="mb-4">
            <label htmlFor="rejectionReason" className="block mb-2">
              Motif du refus :
            </label>
            <Input
              id="rejectionReason"
              placeholder="Précisez le motif du refus"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-lg"
              onClick={onRejectSubmit}
            >
              Confirmer le refus
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded-lg"
              onClick={() => setRejectModalOpen(false)}
            >
              Annuler
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
