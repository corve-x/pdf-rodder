import { FlowExample } from "@/components/tools/FlowExample";

export function ToolDifference() {
  return (
    <section
      aria-labelledby="which-tool"
      className="border-t border-border pt-8"
    >
      <h2 id="which-tool" className="text-lg font-semibold text-text">
        Which tool do I need?
      </h2>
      <div className="mt-5 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold text-text">
            Convert into PDF{" "}
            <span className="font-normal text-text-muted">
              — One file → One PDF
            </span>
          </p>
          <FlowExample inputs={["document.docx"]} output="document.pdf" />
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-text">
            Merge into PDF{" "}
            <span className="font-normal text-text-muted">
              — Multiple files → One PDF
            </span>
          </p>
          <FlowExample
            inputs={[
              "document.docx",
              "presentation.pptx",
              "image.jpg",
              "existing.pdf",
            ]}
            output="merged.pdf"
          />
        </div>
      </div>
    </section>
  );
}
