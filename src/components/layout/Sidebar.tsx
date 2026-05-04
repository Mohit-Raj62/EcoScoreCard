
"use client"

import { LayoutDashboard, Lightbulb, Settings, BarChart3, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12 h-screen border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Smart Classroom
          </h2>
          <div className="space-y-1">
            <Link href="/">
              <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/devices">
              <Button variant={pathname === "/devices" ? "secondary" : "ghost"} className="w-full justify-start">
                <Lightbulb className="mr-2 h-4 w-4" />
                Devices
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant={pathname === "/analytics" ? "secondary" : "ghost"} className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant={pathname === "/settings" ? "secondary" : "ghost"} className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 px-3 w-full">
         <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
         </Button>
      </div>
    </div>
  );
}
