import { Link } from 'react-router-dom'
import Panel from '../ui/Panel'
import Button from '../ui/Button'

export default function MusicCard({
  title,
  subtitle,
  index,
  cta = 'Open',
  to = '/',
  secondaryAction,
  secondaryLabel,
}) {
  return (
    <Panel className="p-4 transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000]">
      <Link to={to} className="block">
        <div className="grid aspect-square place-items-center border-4 border-black bg-neutral-200 text-center text-xs font-black uppercase tracking-[0.25em]">
          Cover {index}
        </div>

        <h3 className="mt-4 text-lg font-black uppercase">{title}</h3>
        <p className="mt-2 text-sm font-bold uppercase text-neutral-700">
          {subtitle}
        </p>
      </Link>

      <div className="mt-4 flex gap-3">
        <Button as={Link} to={to} variant="secondary" size="sm">
          {cta}
        </Button>

        {secondaryAction ? (
          <Button onClick={secondaryAction} variant="muted" size="sm">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </Panel>
  )
}