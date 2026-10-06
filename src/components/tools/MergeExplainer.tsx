import { ArrowDown } from "lucide-react";

/** Shown under the empty Merge upload area: merging is not limited to PDFs. */
export function MergeExplainer() {
  return (
    <section
      aria-labelledby="multi-types"
      className="mt-10 border-t border-border pt-8"
    >
      <h2 id="multi-types" className="text-lg font-semibold text-text">
        One tool. Multiple file types.
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        PDF Rodder can take different supported file formats and turn them into
        one PDF.
      </p>
      <div className="mt-5 flex flex-col items-start gap-2">
        <p className="break-words font-mono text-sm text-text">
          DOCX + PPTX + XLSX + JPG + PDF
        </p>
        <ArrowDown
          className="h-4 w-4 text-orange"
          aria-label="becomes"
          role="img"
        />
        <p className="font-mono text-sm text-orange">One merged PDF</p>
      </div>
    </section>
  );
}
