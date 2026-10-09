import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopShell } from "@/components/shop/shop-shell";
import { Button } from "@/components/ui/button";
import { useDbs } from "@/lib/store";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/news")({
  component: PublicNewsPage,
});

function PublicNewsPage() {
  const news = useDbs((s) => s.news).filter((post) => post.published);
  return (
    <ShopShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Digital Business Store</p>
            <h1 className="mt-2 font-display text-3xl font-semibold">Actualités</h1>
            <p className="mt-2 text-sm text-muted-foreground">Nouveautés, conseils et annonces de la boutique.</p>
          </div>
          <Button asChild variant="outline"><Link to="/boutique">Retour à la boutique</Link></Button>
        </div>
        {news.length === 0 ? <div className="dbs-panel p-6 text-sm text-muted-foreground">Aucune actualité publiée pour le moment.</div> : (
          <div className="space-y-4">
            {news.map((post) => (
              <article key={post.id} className="dbs-panel space-y-3 p-5">
                <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                <h2 className="font-display text-xl font-semibold">{post.title}</h2>
                <p className="font-medium">{post.excerpt}</p>
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </ShopShell>
  );
}
