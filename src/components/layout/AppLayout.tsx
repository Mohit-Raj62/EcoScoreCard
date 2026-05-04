
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex bg-background min-h-screen">
       <div className="hidden border-r bg-muted/40 md:block w-64">
           <Sidebar className="w-64 fixed h-full" />
       </div>
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar />
        <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
