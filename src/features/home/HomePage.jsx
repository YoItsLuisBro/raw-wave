import MusicCard from "../../components/music/MusicCard";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import { albums } from "../../data/albums";
import { playlists } from "../../data/playlists";
import { tracks } from "../../data/tracks";
import { usePlayerStore } from "../../app/store/playerStore";
import { useLibraryStore } from "../../app/store/libraryStore";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";

export default function HomePage() {
  const playTrack = usePlayerStore((state) => state.playTrack);

  const savedAlbumIds = useLibraryStore((state) => state.savedAlbumIds);
  const savedPlaylistIds = useLibraryStore((state) => state.savedPlaylistIds);
  const toggleSavedAlbum = useLibraryStore((state) => state.toggleSavedAlbum);
  const toggleSavedPlaylist = useLibraryStore(
    (state) => state.toggleSavedPlaylist,
  );

  const handlePlayMix = () => {
    if (!tracks.length) return;
    playTrack(tracks[0], tracks);
  };

  return (
    <section className="space-y-8">
      <Panel tone="black" className="p-5 md:p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.25em]">
          Featured Transmission
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase md:text-5xl">
          RAW SIGNALS
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-bold uppercase tracking-[0.12em] text-neutral-300">
          Editorial playlists, industrial energy, oversized type, zero softness.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={handlePlayMix} variant="secondary">
            Play Mix
          </Button>
          <Button variant="muted">View Archive</Button>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border-4 border-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                Blocks
              </p>
              <p className="mt-2 text-2xl font-black uppercase">12</p>
            </div>

            <div className="border-4 border-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                Queue
              </p>
              <p className="mt-2 text-2xl font-black uppercase">Live</p>
            </div>

            <div className="border-4 border-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                Mode
              </p>
              <p className="mt-2 text-2xl font-black uppercase">Mono</p>
            </div>
          </div>
        </div>
      </Panel>

      <ThemeSwitcher />

      <div>
        <SectionTitle
          eyebrow="Curated blocks"
          title="Featured Playlists"
          meta={`${playlists.length} items`}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {playlists.map((playlist, index) => {
            const isSaved = savedPlaylistIds.includes(playlist.id);

            return (
              <MusicCard
                key={playlist.id}
                index={index + 1}
                title={playlist.title}
                subtitle={`Playlist / ${playlist.curator}`}
                cta="Open Playlist"
                to={`/playlist/${playlist.id}`}
                secondaryAction={() => toggleSavedPlaylist(playlist.id)}
                secondaryLabel={isSaved ? "Saved" : "Save"}
              />
            );
          })}
        </div>
      </div>

      <div>
        <SectionTitle
          eyebrow="System releases"
          title="Albums"
          meta={`${albums.length} items`}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {albums.map((album, index) => {
            const isSaved = savedAlbumIds.includes(album.id);

            return (
              <MusicCard
                key={album.id}
                index={index + 1}
                title={album.title}
                subtitle={`${album.artist} / ${album.year}`}
                cta="Open Album"
                to={`/album/${album.id}`}
                secondaryAction={() => toggleSavedAlbum(album.id)}
                secondaryLabel={isSaved ? "Saved" : "Save"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
