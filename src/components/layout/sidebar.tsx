import { Link, useRouterState } from "@tanstack/react-router";
import { DbsLogo } from "@/components/brand/logo";
import { adminNav, assistNav } from "@/components/layout/nav";
import { cn } from "@/lib/utils";

function NavLink({
  to,
  label,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: (typeof adminNav)[number]["icon"];
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to as never}
      onClick={onNavigate}
      className={cn(
        "flex h-10 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
        active
          ? "bg-primary text-primary-foreground"
          : "text-sidebar-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col bg-sidebar px-3 py-4">
      <div className="px-2 pb-4">
        <DbsLogo />
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
        {adminNav.map((item) => (
          <NavLink key={item.to} {...item} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="pt-3">
        <NavLink {...assistNav} onNavigate={onNavigate} />
      </div>
    </aside>
  );
}
