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
        <div className="mx-4 mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-100 lg:mx-6">
          <strong>Mode démonstration.</strong> Les données sont enregistrées dans ce navigateur.
          L’administration et les paiements ne sont pas sécurisés pour la production.
        </div>
        <main className="px-4 py-5 pb-24 lg:px-6 lg:pb-8">{children}</main>
      </div>
      <MobileDock />
    </div>
  );
}
