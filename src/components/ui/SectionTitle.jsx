import { cn } from "../../lib/cn";

export default function SectionTitle({ eyebrow, title, meta, className }) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow ? (
          <p className="text-[10px] font-black uppercase tracking-[0.25em]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-black uppercase md:text-3xl">{title}</h2>
      </div>

      {meta ? (
        <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em]">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
