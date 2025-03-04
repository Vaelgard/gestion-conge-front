// EmployeesPage.tsx
import { useState, useEffect } from "react";
import { z } from "zod";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Your UI table components
import { User } from "@/models/User"; // Your User model
import UserService from "@/services/userService"; // Your API service
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/common/Modal"; // The modal component we just created
import { FormField } from "@/components/ui/form"; // Your form field component
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<User | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
  });

  // Fetch employees and filter based on search criteria.
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await UserService.getEmployee();
        if (data) {
          let filteredData = data;

          if (searchQuery.name) {
            filteredData = filteredData.filter((user: User) =>
              user.name.toLowerCase().includes(searchQuery.name.toLowerCase())
            );
          }

          if (searchQuery.email) {
            filteredData = filteredData.filter((user: User) =>
              user.email.toLowerCase().includes(searchQuery.email.toLowerCase())
            );
          }

          if (searchQuery.role) {
            filteredData = filteredData.filter((user: User) =>
              user.role.toLowerCase().includes(searchQuery.role.toLowerCase())
            );
          }

          setEmployees(filteredData.sort((a: User, b: User) => a.id - b.id));
        }
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, [searchQuery]);

  // Delete an employee
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await UserService.deleteEmployee(id);
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error("Failed to delete employee", error);
      }
    }
  };

  // Open modal and set employee to edit
  const handleEditClick = (employee: User) => {
    console.log("Editing employee:", employee);
    setEmployeeToEdit(employee);
    setModalOpen(true);
    // Pre-populate form fields with selected employee data
    form.reset({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      password: "", // For security reasons, leave password empty
      role: employee.role,
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEmployeeToEdit(null);
    form.reset();
  };

  // Submit updated data
  const onSubmit = async (data: FormValues) => {
    if (!data.id) {
      console.error("ID is required for updating");
      return;
    }

    try {
      const result = await UserService.updateUser(data);
      console.log("User updated successfully", result);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === data.id ? { ...emp, ...data } : emp))
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nom"
          className="border px-2 py-1 rounded-md mr-2"
          value={searchQuery.name}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          className="border px-2 py-1 rounded-md mr-2"
          value={searchQuery.email}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Rôle"
          className="border px-2 py-1 rounded-md"
          value={searchQuery.role}
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, role: e.target.value })
          }
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Liste des Employés</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
                    onClick={() => handleEditClick(employee)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Supprimer
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Modal for updating employee */}
      {modalOpen && employeeToEdit && (
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <h2 className="text-xl font-bold mb-4">Modifier l'employé</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <input type="hidden" {...field} value={employeeToEdit.id} />
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input placeholder="Nom" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input placeholder="Email" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <Input placeholder="Téléphone" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={employeeToEdit.role}>
                  <SelectTrigger className="border px-2 py-1 rounded-md">
                    <SelectValue placeholder="Rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrateur</SelectItem>
                    <SelectItem value="USER">Employé</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button type="submit">Mettre à jour</Button>
              <Button type="button" onClick={handleCloseModal}>
                Annuler
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
