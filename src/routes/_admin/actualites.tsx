import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDbs } from "@/lib/store";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_admin/actualites")({
  component: NewsAdminPage,
});

function NewsAdminPage() {
  const news = useDbs((s) => s.news);
  const addNewsPost = useDbs((s) => s.addNewsPost);
  const toggleNewsPublished = useDbs((s) => s.toggleNewsPublished);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !excerpt.trim() || !body.trim()) {
      toast.error("Remplissez tous les champs avant d’enregistrer.");
      return;
    }
    addNewsPost({ title: title.trim(), excerpt: excerpt.trim(), body: body.trim(), published: false });
    setTitle("");
    setExcerpt("");
    setBody("");
    toast.success("Article enregistré comme brouillon.");
  }

  return (
    <div>
      <PageHeader title="Actualités DBS" description="Rédigez des articles, puis publiez-les sur la page Actualités de la boutique." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="dbs-panel grid content-start gap-3 p-5" onSubmit={submit}>
          <h2 className="font-semibold">Nouvel article</h2>
          <div className="grid gap-1.5">
            <Label htmlFor="news-title">Titre</Label>
            <Input id="news-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="news-excerpt">Résumé</Label>
            <Textarea id="news-excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} maxLength={280} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="news-body">Contenu</Label>
            <Textarea id="news-body" value={body} onChange={(e) => setBody(e.target.value)} rows={8} required />
          </div>
          <Button type="submit" className="w-fit">Enregistrer le brouillon</Button>
          <p className="text-xs text-muted-foreground">Les articles sont stockés dans le navigateur de démonstration, pas dans une base de données en ligne.</p>
        </form>
        <section className="space-y-3">
          <h2 className="font-semibold">Articles ({news.length})</h2>
          {news.length === 0 ? <div className="dbs-panel p-5 text-sm text-muted-foreground">Aucun article pour le moment. Créez votre premier brouillon.</div> : null}
          {news.map((post) => (
            <article key={post.id} className="dbs-panel space-y-3 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold">{post.title}</h3>
                <span className="rounded-full bg-secondary px-2 py-1 text-xs">{post.published ? "Publié" : "Brouillon"}</span>
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
              <p className="text-sm">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant={post.published ? "outline" : "default"} onClick={() => { toggleNewsPublished(post.id); toast.success(post.published ? "Article remis en brouillon." : "Article publié sur la page Actualités."); }}>
                  {post.published ? "Dépublier" : "Publier"}
                </Button>
                {post.published ? <a className="inline-flex h-9 items-center rounded-md border px-3 text-sm" href="/news" target="_blank" rel="noreferrer">Voir la page publique</a> : null}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
