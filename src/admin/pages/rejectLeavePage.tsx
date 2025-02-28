import { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust import path as needed
import { Input } from "@/components/ui/input";   // Adjust import path as needed

// Define the leave request interface
interface LeaveRequest {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Sample data for pending requests
const initialPendingRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeName: "Alice Dupont",
    startDate: "2023-09-01",
    endDate: "2023-09-05",
    reason: "Vacances",
    status: "Pending",
  },
  {
    id: 3,
    employeeName: "Claire Bernard",
    startDate: "2023-09-15",
    endDate: "2023-09-18",
    reason: "Personnel",
    status: "Pending",
  },
];

export default function LeavesRejectPage() {
  const [requests, setRequests] = useState(initialPendingRequests);
  const [rejectionReasons, setRejectionReasons] = useState<{ [key: number]: string }>({});

  const handleReject = (id: number) => {
    // In a real app, you might send the rejection reason to an API.
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Refuser une demande de congé
      </h1>
      {requests.length === 0 ? (
        <p>Aucune demande en attente.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="p-4 border rounded-lg">
              <div className="mb-2">
                <p className="font-bold">{req.employeeName}</p>
                <p>
                  {req.startDate} - {req.endDate}
                </p>
                <p>Raison: {req.reason}</p>
              </div>
              {req.status === "Pending" ? (
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Motif de refus"
                    value={rejectionReasons[req.id] || ""}
                    onChange={(e) =>
                      setRejectionReasons({
                        ...rejectionReasons,
                        [req.id]: e.target.value,
                      })
                    }
                  />
                  <Button
                    onClick={() => handleReject(req.id)}
                    variant="destructive"
                  >
                    Refuser
                  </Button>
                </div>
              ) : (
                <span className="text-red-600 font-bold">Refusé</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
