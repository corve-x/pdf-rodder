import { ArrowDown } from "lucide-react";

interface FlowExampleProps {
  inputs: string[];
  output: string;
}

/** Small "these files → this PDF" illustration. */
export function FlowExample({ inputs, output }: FlowExampleProps) {
  return (
    <div className="space-y-2 font-mono text-sm">
      <ul className="space-y-1 text-text-secondary">
        {inputs.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <ArrowDown
        className="h-4 w-4 text-orange"
        aria-label="becomes"
        role="img"
      />
      <p className="text-text">{output}</p>
    </div>
  );
}
