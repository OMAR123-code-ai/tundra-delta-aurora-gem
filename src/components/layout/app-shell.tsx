import { useEffect, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileDock, Topbar } from "@/components/layout/topbar";
import { rehydrateStore } from "@/lib/store";

export function AppShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    rehydrateStore();
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="fixed inset-y-0 left-0 z-20 hidden w-60 border-r border-border lg:block">
        <Sidebar />
      </div>
      <div className="lg:pl-60">
        <Topbar />
        <main className="px-4 py-5 pb-24 lg:px-6 lg:pb-8">{children}</main>
      </div>
      <MobileDock />
    </div>
  );
}
