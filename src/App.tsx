import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './common/login';
import Dashboard from "@/admin/pages/dashbord";
import AddEmployee from './admin/pages/AddEmployee';
import EmployeesPage from './admin/pages/EmployeesPage';
import LeavesRequestsPage from './admin/pages/leaveRequestPage';
import LeavesApprovePage from './admin/pages/approveLeavePage';
import LeavesRejectPage from './admin/pages/rejectLeavePage';
import Profile from './admin/pages/profile';



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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App