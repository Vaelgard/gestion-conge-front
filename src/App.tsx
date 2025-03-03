import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './common/login';
import Dashboard from "@/admin/pages/dashbord";
import AddEmployee from './admin/pages/AddEmployee';
import EmployeesPage from './admin/pages/EmployeesPage';
import LeavesRequestsPage from './admin/pages/leaveRequestPage';
import LeavesApprovePage from './admin/pages/approveLeavePage';
import LeavesRejectPage from './admin/pages/rejectLeavePage';
import Profile from './common/profile';
import LeaveRequestPage from './employees/pages/leaveRequestPage';
import LeavesStatusPage from './employees/pages/leaveStatusPage';
import { useEffect } from 'react';
import EmployeeDashboard from './employees/pages/employeeDashbord';



const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "employees/add", element: <AddEmployee /> },
      { path: "employees/list", element: <EmployeesPage/>},
      { path: "leaves/requests", element: <LeavesRequestsPage/>},
      { path: "leaves/approve", element: <LeavesApprovePage/> },
      { path: "leaves/reject", element: <LeavesRejectPage/> },
      { path: "/dashboard/profile", element: <Profile/> },
    ],
  },
  {
    path:"/employees/dashboard",
    element: <EmployeeDashboard />,
    children: [
      {path: "profile", element: <Profile/>},
      {path:"leaves/request", element: <LeaveRequestPage/>},
      {path:"leaves/status", element: <LeavesStatusPage/>},
    ],
  }
]);
function App() {
  useEffect(() => {
    document.title = "Gestion des congés";
  }, []);
  return <RouterProvider router={router} />;

}

export default App