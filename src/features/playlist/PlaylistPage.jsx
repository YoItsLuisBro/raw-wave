import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { playlists } from "../../data/playlists";
import { tracks } from "../../data/tracks";
import Panel from "../../components/ui/Panel";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import TrackRow from "../../components/music/TrackRow";
import { usePlayerStore } from "../../app/store/playerStore";
import { useLibraryStore } from "../../app/store/libraryStore";

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const playTrack = usePlayerStore((state) => state.playTrack);
  const savedPlaylistIds = useLibraryStore((state) => state.savedPlaylistIds);
  const toggleSavedPlaylist = useLibraryStore(
    (state) => state.toggleSavedPlaylist,
  );

  const playlist = playlists.find((item) => item.id === playlistId);

  const playlistTracks = useMemo(() => {
    if (!playlist) return [];
    return playlist.trackIds
      .map((trackId) => tracks.find((track) => track.id === trackId))
      .filter(Boolean);
  }, [playlist]);

  if (!playlist) {
    return (
      <Panel className="p-6">
        <h2 className="text-2xl font-black uppercase">Playlist Not Found</h2>
        <p className="mt-3 text-sm font-bold uppercase text-neutral-700">
          This archive block does not exist.
        </p>
        <div className="mt-4">
          <Button as={Link} to="/" variant="secondary">
            Return Home
          </Button>
        </div>
      </Panel>
    );
  }

  const isSaved = savedPlaylistIds.includes(playlist.id);

  const handlePlayPlaylist = () => {
    if (!playlistTracks.length) return;
    playTrack(playlistTracks[0], playlistTracks);
  };

  return (
    <section className="space-y-6">
      <Panel striped className="p-5 md:p-6">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="grid aspect-square place-items-center border-4 border-black bg-white text-center text-sm font-black uppercase tracking-[0.25em]">
            Playlist {playlist.cover}
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]">
              Playlist
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase md:text-5xl">
              {playlist.title}
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-neutral-700">
              Curated by {playlist.curator}
            </p>
            <p className="mt-4 max-w-2xl text-sm font-bold uppercase tracking-widest text-neutral-700">
              {playlist.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={handlePlayPlaylist} variant="primary">
                Play Playlist
              </Button>
              <Button
                onClick={() => toggleSavedPlaylist(playlist.id)}
                variant="secondary"
              >
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Panel>

      <SectionTitle
        eyebrow="Playlist contents"
        title="Queue Block"
        meta={`${playlistTracks.length} tracks`}
      />

      <div className="grid gap-3">
        {playlistTracks.map((track, index) => (
          <TrackRow
            key={track.id}
            index={String(index + 1).padStart(2, "0")}
            title={track.title}
            artist={track.artist}
            duration={track.duration}
            track={track}
            queue={playlistTracks}
          />
        ))}
      </div>
    </section>
  );
}
