import  { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserService from "@/services/userService";
import { logout } from "@/auth/authService";

// Define the form schema with validation
const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  phone: z.string().min(10, { message: "Le numéro de téléphone doit contenir au moins 10 chiffres." }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
  role: z.string().min(1, { message: "Veuillez sélectionner un rôle." }),
});

// Define the form values based on the schema
type FormValues = z.infer<typeof formSchema>;

export default function Profile({ utilisateur }: { utilisateur?: FormValues }) {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Initialize the form with either the passed user or blank values.
  // We'll update the form with fetched data if no "utilisateur" prop is provided.
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: utilisateur || {
      id: undefined,
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    },
  });

  // Fetch default values if no "utilisateur" prop was provided
  useEffect(() => {
    if (!utilisateur) {
      (async () => {
        try {
          const data = await UserService.getUser();
          console.log("Fetched user data:", data);
          form.reset({...data.ourUsers,password: ""});
        } catch (error) {
          console.error("Error fetching employee data:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [utilisateur, form]);

  async function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    // Proceed only if an ID is present
    if (!data.id) {
      setMessage("Aucun utilisateur trouvé pour la mise à jour.");
      return;
    }
    try {
      const result = await UserService.updateUser({ ...data, id: data.id! });
      console.log("User updated successfully", result);
      setMessage("Utilisateur mis à jour avec succès");
      logout();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Erreur lors de la mise à jour de l'utilisateur");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Mettre à jour l'utilisateur</CardTitle>
        <CardDescription>
          Modifier les détails de l'utilisateur
        </CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className="mb-4 p-2 rounded bg-green-100 text-green-800">
            {message}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Hidden field for the user ID */}
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => <input type="hidden" {...field} />}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Youness M" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="youness@exemple.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="06 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Le mot de passe doit contenir au moins 8 caractères.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrateur</SelectItem>
                      <SelectItem value="USER">Employé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button">
                Annuler
              </Button>
              <Button type="submit">
                Mettre à jour
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
