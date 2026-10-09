import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Digital Business Store";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#070B14" },
      {
        name: "description",
        content:
          "Digital Business Store — pilotez votre boutique : produits, commandes, paiements mobiles et IA.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootDocument,
});

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
      <div className="text-center">
        <p className="font-display text-2xl font-semibold">Page introuvable</p>
        <p className="mt-2 text-sm text-muted-foreground">Ce lien n’existe pas dans DBS.</p>
        <Button asChild className="mt-6">
          <Link to="/">Retour au tableau de bord</Link>
        </Button>
      </div>
    </main>
  );
}

function RootDocument() {
  return (
    <html lang="fr" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <TooltipProvider>
            <Outlet />
          </TooltipProvider>
        </AuthProvider>
        <Toaster theme="dark" position="top-right" />
        <Scripts />
      </body>
    </html>
  );
}
