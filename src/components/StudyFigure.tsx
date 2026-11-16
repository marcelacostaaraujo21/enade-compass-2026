type StudyFigureProps = {
  src: string;
  alt: string;
  caption: string;
};

export function StudyFigure({ src, alt, caption }: StudyFigureProps) {
  return (
    <figure className="mx-auto my-5 max-w-4xl overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="p-2 sm:p-3">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="mx-auto block h-auto w-full" />
      </div>
      <figcaption className="border-t bg-muted/40 px-4 py-3 text-sm">
        {caption}
        <span className="mt-1 block text-xs text-muted-foreground">Fonte: GEPRO (2026).</span>
      </figcaption>
    </figure>
  );
}
