import Panel from "./Panel";
import Button from "./Button";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <Panel className="p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.25em]">
        Empty State
      </p>
      <h3 className="mt-2 text-2xl font-black uppercase">{title}</h3>
      <p className="mt-3 text-sm font-bold uppercase text-neutral-700">
        {description}
      </p>

      {actionLabel && onAction ? (
        <div className="mt-4">
          <Button onClick={onAction} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </Panel>
  );
}
