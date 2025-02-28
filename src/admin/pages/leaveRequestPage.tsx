import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// Define a simple interface for a leave request.
interface LeaveRequest {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Sample leave requests data
const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeName: "Alice Dupont",
    startDate: "2023-09-01",
    endDate: "2023-09-05",
    reason: "Vacances",
    status: "Pending",
  },
  {
    id: 2,
    employeeName: "Bob Martin",
    startDate: "2023-09-10",
    endDate: "2023-09-12",
    reason: "Maladie",
    status: "Approved",
  },
  {
    id: 3,
    employeeName: "Claire Bernard",
    startDate: "2023-09-15",
    endDate: "2023-09-18",
    reason: "Personnel",
    status: "Rejected",
  },
];

export default function LeavesRequestsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Consulter les demandes de congé
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom de l'employé</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.employeeName}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>
                <button
                  className={`rounded-full px-3 py-1 text-white font-semibold transition-colors duration-200 ${
                    request.status === "Approved"
                      ? "bg-green-500 hover:bg-green-600"
                      : request.status === "Rejected"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {request.status}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
