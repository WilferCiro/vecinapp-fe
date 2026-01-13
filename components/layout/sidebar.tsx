"use client";

import type React from "react";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Dumbbell,
  LogOut,
  Menu,
  Megaphone,
  Trees,
  MessageCircleQuestionMark,
  KeySquare,
  Construction,
  BookUser,
  HandCoins,
  CirclePile,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { ThemeToggle } from "../theme/theme-toggle";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutService } from "@/data/services/login.service";
import { useMe } from "@/hooks/use-me";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Array<"admin" | "resident" | "watchman">;
  soon?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "resident"],
  },
  {
    title: "Comunicados internos",
    href: "/dashboard/comunicados",
    icon: Megaphone,
    roles: ["admin", "resident"],
  },
  {
    title: "Zonas comunes",
    href: "/dashboard/zonas-comunes",
    icon: Trees,
    roles: ["admin", "resident"],
  },
  {
    title: "PQRS",
    href: "/dashboard/pqrs",
    icon: MessageCircleQuestionMark,
    roles: ["admin", "resident"],
  },
  {
    title: "Ingresos",
    href: "/dashboard/visitantes",
    icon: KeySquare,
    roles: ["admin", "watchman"],
  },
  {
    title: "Mantenimientos",
    href: "/dashboard/mantenimientos",
    icon: Construction,
    roles: ["admin", "resident", "watchman"],
    soon: true,
  },
  {
    title: "Inventario",
    href: "/dashboard/inventario",
    icon: CirclePile,
    roles: ["admin"],
    soon: true,
  },
  {
    title: "Pagos",
    href: "/dashboard/pagos",
    icon: HandCoins,
    roles: ["admin", "resident"],
    soon: true,
  },
  {
    title: "Directorio",
    href: "/dashboard/directorio",
    icon: BookUser,
    roles: ["admin", "resident"],
    soon: true,
  },
];

function SidebarContent() {
  const { user, loading, setUser } = useMe();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logoutService,
  });

  const handleLogout = async () => {
    const result = await mutation.mutateAsync();
    if (result?.ok) {
      queryClient.removeQueries({ queryKey: ['me'] });
      setUser(null);
      router.push("/login");
    }
  };

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Dumbbell className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Los pinos</h2>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isSoon = item.soon;
          return (
            <Link href={item.href} key={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                disabled={isSoon}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.title}
                {isSoon && (
                  <Badge className="ml-auto" variant="secondary">
                    Pronto
                  </Badge>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <ThemeToggle />
        <div className="mb-3 p-3 bg-muted rounded-lg">
          <p className="font-semibold text-sm">{user?.firstName}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40 bg-transparent"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <aside className="hidden lg:flex w-64 border-r bg-card h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
