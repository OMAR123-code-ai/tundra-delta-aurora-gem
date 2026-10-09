import { cn } from "@/lib/utils";

export function DbsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={cn("size-9", className)} aria-hidden="true">
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="currentColor"
        className="text-primary"
        strokeWidth="1.7"
      />
      <circle cx="18" cy="18" r="12.5" className="fill-primary/15" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        className="fill-primary"
        fontFamily="Outfit, sans-serif"
      >
        D
      </text>
    </svg>
  );
}

export function DbsLogo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <DbsMark />
      {!compact && (
        <div className="min-w-0 leading-tight">
          <div
            className={cn(
              "font-display text-sm font-semibold tracking-wide",
              light ? "text-primary-foreground" : "text-foreground",
            )}
          >
            DBS
          </div>
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Digital Business Store
          </div>
        </div>
      )}
    </div>
  );
}
