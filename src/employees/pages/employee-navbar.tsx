"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/auth/authService";
import { useNavigate } from "react-router-dom";

export function DashboardEmployeeNavbar() {
  const navigate=useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-between px-6">
      {/* Left Side: Sidebar & Search */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8 lg:hidden" />
        <div className="relative hidden md:flex">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="chercher..." className="w-72 rounded-md bg-background pl-10" />
        </div>
      </div>

      {/* Right Side: Actions & User Menu */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1.5 -top-1.5 h-5 w-5 p-0 text-xs">3</Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-9 items-center gap-2 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">User</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
              Paramètres
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
            Se déconnecter
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
