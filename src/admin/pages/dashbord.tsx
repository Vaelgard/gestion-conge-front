import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/admin/pages/admin-sidebar";
import { DashboardNavbar } from "@/admin/pages/admin-navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line 
} from "recharts";

// Sample Data
const employesParType = [
  { name: "Salariés", value: 120 },
  { name: "Stagiaires", value: 80 },
];

const demandesConge = [
  { name: "Acceptées", value: 30 },
  { name: "Refusées", value: 10 },
];

const employesParDepartement = [
  { name: "RH", count: 20 },
  { name: "IT", count: 50 },
  { name: "Finance", count: 30 },
  { name: "Marketing", count: 25 },
];

const embauchesTendance = [
  { month: "Jan", count: 5 },
  { month: "Fév", count: 8 },
  { month: "Mar", count: 15 },
  { month: "Avr", count: 10 },
  { month: "Mai", count: 20 },
  { month: "Juin", count: 30 },
];

// Colors for Pie Chart
const COLORS = ["#0088FE", "#FF8042"];
export default function DashboardLayout() {
  const location = useLocation();
  const showCharts = location.pathname === "/dashboard"; 

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row min-h-screen">
       {/*for a Responsive Sidebar */}
        <AppSidebar className="hidden md:flex" />
        <SidebarInset className="flex-1 w-full">
        {/*Navbar*/}
          <header className="flex h-16 w-full md:w-415  items-center border-b px-4">
            <DashboardNavbar />
          </header>
          
          <main className="p-4 space-y-6">
            {showCharts && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre d'employés par type (Bar Chart) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Nombre d'employés par type
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={employesParType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Statut des demandes de congé (Pie Chart) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Statut des demandes de congé
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={demandesConge}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {demandesConge.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Nombre d'employés par département (Bar Chart) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Nombre d'employés par département
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={employesParDepartement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Tendance des embauches (Line Chart) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tendance des embauches
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={embauchesTendance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {/*Page Content*/}
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

