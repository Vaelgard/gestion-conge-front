// AppSidebar.tsx
import * as React from "react";
import { Users, ClipboardList, CheckCircle, XCircle, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Gestion des employés",
    url: "#",
    icon: <Users className="size-4" />,
    subItems: [
      { title: "Ajouter un employé", url: "/dashboard/employees/add" },
      { title: "Liste des employés", url: "/dashboard/employees/list" },
    ],
  },
  {
    title: "Gestion des congés",
    url: "#",
    icon: <ClipboardList className="size-4" />,
    subItems: [
      { title: "Consulter les demandes", url: "/dashboard/leaves/requests" },
      {
        title: "Demandes Accepter",
        url: "/dashboard/leaves/approve",
        icon: <CheckCircle className="size-4" />,
      },
      {
        title: "Demandes Refuser",
        url: "/dashboard/leaves/reject",
        icon: <XCircle className="size-4" />,
      },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Gestion RH</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.subItems && (
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url} className="flex items-center gap-2">
                            {subItem.icon || null}
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
