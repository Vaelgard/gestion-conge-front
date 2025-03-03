import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserService from "@/services/userService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      // Use the login method from UserService
      const response = await UserService.login(email, password);
  
      if (!response.token) {
        throw new Error("Email ou mot de passe incorrect");
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("refrechtoken", response.refreshToken);
      localStorage.setItem("email", email);
      localStorage.setItem("role", response.role);
      localStorage.setItem("username", response.name);
      if (response.role === "ADMIN") {
        navigate("/dashboard");
      } else{
        navigate("/employees/dashboard/leaves/status");
      }
      
    } catch (err: any) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="bg-primary p-2 rounded-full">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-center">Gestion des Employés</h1>
        </div>

        <Card>
          <form onSubmit={handleOnSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Connexion</CardTitle>
              <CardDescription className="text-center">
                Entrez vos identifiants pour accéder à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="Adresse e-mail" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" name="password" type="password" placeholder="Mot de passe" required />
              </div>
              <div className="flex items-center space-x-2 mb-5">
                <Checkbox id="remember" name="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">Se souvenir de moi</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
