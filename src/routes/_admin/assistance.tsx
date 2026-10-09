import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDbs } from "@/lib/store";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_admin/assistance")({
  component: AssistPage,
});

const faqs = [
  {
    q: "Comment synchroniser Shopify ?",
    a: "Ouvrez API & Intégrations, collez votre secret Shopify puis cliquez sur Connecter.",
  },
  {
    q: "Quels moyens de paiement sont disponibles ?",
    a: "Orange Money, Moov Money, Wave, carte bancaire et virement — activables dans DBS Payment.",
  },
  {
    q: "Comment l’IA calcule-t-elle le score ?",
    a: "Vélocité des ventes, marge réelle et stock. Lancez une analyse depuis Produits gagnants.",
  },
];

export function AssistPage() {
  const addTicket = useDbs((s) => s.addTicket);
  const tickets = useDbs((s) => s.tickets);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    addTicket(subject, message);
    setSubject("");
    setMessage("");
    toast.success("Ticket envoyé à l’assistance");
  }

  return (
    <div>
      <PageHeader
        title="Assistance"
        description="FAQ, tickets et contact 24/7 pour Digital Business Store."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="dbs-panel p-4">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <form className="dbs-panel grid gap-3 p-5" onSubmit={submit}>
          <h2 className="font-semibold">Nouveau ticket</h2>
          <div className="grid gap-1.5">
            <Label htmlFor="sub">Sujet</Label>
            <Input id="sub" required value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" required value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <Button type="submit" className="w-fit">
            Envoyer
          </Button>
          {tickets.length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm">
              {tickets.map((t) => (
                <li key={t.id} className="rounded-md bg-secondary px-3 py-2">
                  <p className="font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(t.date)} · {t.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </form>
      </div>
    </div>
  );
}
