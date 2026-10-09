import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
