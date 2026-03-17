import { Play, Pause, Plus, Check } from 'lucide-react'
import { cn } from '../../lib/cn'
import Button from '../ui/Button'
import { usePlayerStore } from '../../app/store/playerStore'
import { useLibraryStore } from '../../app/store/libraryStore'

export default function TrackRow({
  index,
  title,
  artist,
  duration,
  track,
  queue = [],
}) {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const playTrack = usePlayerStore((state) => state.playTrack)
  const togglePlay = usePlayerStore((state) => state.togglePlay)

  const likedTrackIds = useLibraryStore((state) => state.likedTrackIds)
  const toggleLikedTrack = useLibraryStore((state) => state.toggleLikedTrack)

  const active = currentTrackId === track.id
  const showPause = active && isPlaying
  const liked = likedTrackIds.includes(track.id)

  const handlePlay = () => {
    if (active) {
      togglePlay()
      return
    }

    playTrack(track, queue)
  }

  return (
    <div
      className={cn(
        'grid items-center gap-3 border-4 border-black px-3 py-3 md:grid-cols-[56px_1fr_160px_140px]',
        active ? 'bg-black text-white' : 'bg-white text-black',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="w-6 text-xs font-black uppercase">{index}</span>
        <Button
          onClick={handlePlay}
          variant={active ? 'secondary' : 'primary'}
          size="icon"
          className="hover:shadow-none"
        >
          {showPause ? (
            <Pause size={16} strokeWidth={2.75} />
          ) : (
            <Play size={16} strokeWidth={2.75} />
          )}
        </Button>
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm pl-5 font-black uppercase tracking-[0.14em]">
          {title}
        </p>
        <p
          className={cn(
            'truncate text-xs font-bold pl-5 uppercase tracking-[0.12em]',
            active ? 'text-neutral-300' : 'text-neutral-600',
          )}
        >
          {artist}
        </p>
      </div>

      <div className="hidden md:block">
        <p className="text-xs font-black uppercase tracking-[0.18em]">
          RAW//WAVE
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.18em]">
          {duration}
        </span>

        <button
          onClick={() => toggleLikedTrack(track.id)}
          className={cn(
            'border-4 border-black p-2',
            liked
              ? 'bg-black text-white'
              : 'bg-transparent hover:bg-black hover:text-white',
          )}
        >
          {liked ? <Check size={16} strokeWidth={2.75} /> : <Plus size={16} strokeWidth={2.75} />}
        </button>
      </div>
    </div>
  )
}