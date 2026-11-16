import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageTitle } from "@/components/AppShell";
import { StudyFigure } from "@/components/StudyFigure";
import { eixos } from "@/lib/content";
import { toggleIn, updateProgress, useProgress } from "@/lib/progress";

const figurasEixos: Record<string, { src: string; alt: string; caption: string }> = {
  "eixo-1": {
    src: "/figuras/eixo1clima.png",
    alt: "Mapa mental do Eixo I sobre mudanças climáticas, justiça climática, economia circular e direito à cidade.",
    caption: "Figura 10: Eixo I: Socioambiental, Clima e Território",
  },
  "eixo-2": {
    src: "/figuras/eixo2.png",
    alt: "Mapa mental do Eixo II sobre ética, direitos humanos, equidade, acessibilidade, democracia e cidadania.",
    caption: "Figura 11: Eixo II: Direitos, Equidade e Inclusão",
  },
  "eixo-3": {
    src: "/figuras/eixo23.png",
    alt: "Mapa mental dos Eixos III e IV sobre trabalho, saúde, Estado, inovação, tecnologia e globalização.",
    caption: "Figura 12: Eixo III – Saúde, Trabalho e Estado e Eixo IV – Inovação, Globalização e Tecnologia",
  },
  "eixo-4": {
    src: "/figuras/eixo4inova.png",
    alt: "Esquema da governança ética da tecnologia e da IA com dados e LGPD, viés algorítmico e impactos no trabalho.",
    caption: "Figura 13: Eixo IV: Inovação, Globalização e Tecnologia",
  },
};

const figuraMobilidade = {
  src: "/figuras/eixo1socio.png",
  alt: "Esquema da relação entre mobilidade ativa, justiça territorial e direito à cidade.",
  caption: "Figura 14: Eixo I: Socioambiental, Clima e Território – mobilidade e direito à cidade",
};

export const Route = createFileRoute("/trilhas")({
  head: () => ({
    meta: [
      { title: "Trilhas de Conhecimento – 4 Eixos ENADE 2026" },
      { name: "description", content: "Os 4 eixos da Portaria INEP nº 154/2026: clima, direitos, trabalho e tecnologia." },
      { property: "og:title", content: "Trilhas de Conhecimento – ENADE 2026" },
      { property: "og:description", content: "Os 12 objetos de conhecimento organizados em 4 eixos." },
    ],
  }),
  component: Trilhas,
});

function Trilhas() {
  const p = useProgress();
  return (
    <div className="space-y-5">
      <PageTitle kicker="Portaria INEP nº 154/2026" title="Trilhas de conhecimento" desc="Os 12 objetos em 4 eixos integrados. Marque cada eixo como estudado." />
      {eixos.map((e) => {
        const done = p.eixos.includes(e.id);
        const figura = figurasEixos[e.id];
        return (
          <Card key={e.id} id={e.id} className="scroll-mt-20">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-2xl font-bold text-primary-foreground">{e.numero}</div>
                <div className="flex-1">
                  <Badge variant="secondary">{e.objetos}</Badge>
                  <h2 className="mt-1 font-display text-2xl font-semibold">{e.titulo}</h2>
                  <p className="text-sm text-muted-foreground">{e.resumo}</p>
                </div>
                <Button variant={done ? "secondary" : "outline"} size="sm" onClick={() => updateProgress((s) => ({ ...s, eixos: toggleIn(s.eixos, e.id) }))}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />} {done ? "Estudado" : "Marcar estudado"}
                </Button>
              </div>
              <Accordion type="multiple" className="mt-4">
                {e.topicos.map((t) => (
                  <AccordionItem key={t.nome} value={t.nome}>
                    <AccordionTrigger className="font-medium">{t.nome}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{t.texto}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Fontes clássicas:</span>
                {e.fontes.map((f) => <Badge key={f} variant="outline" className="font-normal">{f}</Badge>)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
