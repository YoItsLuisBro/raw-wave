import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { albums } from "../../data/albums";
import { tracks } from "../../data/tracks";
import Panel from "../../components/ui/Panel";
import Button from "../../components/ui/Button";
import SectionTitle from "../../components/ui/SectionTitle";
import TrackRow from "../../components/music/TrackRow";
import { usePlayerStore } from "../../app/store/playerStore";
import { useLibraryStore } from "../../app/store/libraryStore";

export default function AlbumPage() {
  const { albumId } = useParams();
  const playTrack = usePlayerStore((state) => state.playTrack);
  const savedAlbumIds = useLibraryStore((state) => state.savedAlbumIds);
  const toggleSavedAlbum = useLibraryStore((state) => state.toggleSavedAlbum);

  const album = albums.find((item) => item.id === albumId);

  const albumTracks = useMemo(() => {
    if (!album) return [];
    return album.trackIds
      .map((trackId) => tracks.find((track) => track.id === trackId))
      .filter(Boolean);
  }, [album]);

  if (!album) {
    return (
      <Panel className="p-6">
        <h2 className="text-2xl font-black uppercase">Album Not Found</h2>
        <p className="mt-3 text-sm font-bold uppercase text-neutral-700">
          This transmission does not exist.
        </p>
        <div className="mt-4">
          <Button as={Link} to="/" variant="secondary">
            Return Home
          </Button>
        </div>
      </Panel>
    );
  }

  const isSaved = savedAlbumIds.includes(album.id);

  const handlePlayAlbum = () => {
    if (!albumTracks.length) return;
    playTrack(albumTracks[0], albumTracks);
  };

  return (
    <section className="space-y-6">
      <Panel tone="black" className="p-5 md:p-6">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="grid aspect-square place-items-center border-4 border-white bg-neutral-900 text-center text-sm font-black uppercase tracking-[0.25em]">
            Album {album.cover}
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]">
              Album
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase md:text-5xl">
              {album.title}
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-neutral-300">
              {album.artist} / {album.year}
            </p>
            <p className="mt-4 max-w-2xl text-sm font-bold uppercase tracking-widest text-neutral-300">
              {album.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={handlePlayAlbum} variant="secondary">
                Play Album
              </Button>
              <Button
                onClick={() => toggleSavedAlbum(album.id)}
                variant="muted"
              >
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Panel>

      <SectionTitle
        eyebrow="Album contents"
        title="Tracklist"
        meta={`${albumTracks.length} tracks`}
      />

      <div className="grid gap-3">
        {albumTracks.map((track, index) => (
          <TrackRow
            key={track.id}
            index={String(index + 1).padStart(2, "0")}
            title={track.title}
            artist={track.artist}
            duration={track.duration}
            track={track}
            queue={albumTracks}
          />
        ))}
      </div>
    </section>
  );
}
