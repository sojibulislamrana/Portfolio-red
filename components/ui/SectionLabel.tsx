import clsx from "clsx";

interface SectionLabelProps {
  index?: string;
  label: string;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({
  index,
  label,
  className,
  light = false,
}: SectionLabelProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3",
        light ? "text-white/40" : "text-muted-dark",
        className
      )}
    >
      {index && (
        <span className="font-mono text-[0.65rem] tracking-widest opacity-60">
          {index}
        </span>
      )}
      <span className="h-px w-8 bg-current opacity-40" />
      <span className="font-mono text-[0.65rem] tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}
