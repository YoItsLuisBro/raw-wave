import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tracks } from "../../data/tracks";
import { albums } from "../../data/albums";
import { playlists } from "../../data/playlists";
import TrackRow from "../../components/music/TrackRow";
import MusicCard from "../../components/music/MusicCard";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";
import { useLibraryStore } from "../../app/store/libraryStore";

export default function LibraryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("liked");

  const likedTrackIds = useLibraryStore((state) => state.likedTrackIds);
  const savedAlbumIds = useLibraryStore((state) => state.savedAlbumIds);
  const savedPlaylistIds = useLibraryStore((state) => state.savedPlaylistIds);
  const recentTrackIds = useLibraryStore((state) => state.recentTrackIds);

  const likedTracks = useMemo(
    () =>
      likedTrackIds
        .map((id) => tracks.find((track) => track.id === id))
        .filter(Boolean),
    [likedTrackIds],
  );

  const savedAlbums = useMemo(
    () =>
      savedAlbumIds
        .map((id) => albums.find((album) => album.id === id))
        .filter(Boolean),
    [savedAlbumIds],
  );

  const savedPlaylists = useMemo(
    () =>
      savedPlaylistIds
        .map((id) => playlists.find((playlist) => playlist.id === id))
        .filter(Boolean),
    [savedPlaylistIds],
  );

  const recentTracks = useMemo(
    () =>
      recentTrackIds
        .map((id) => tracks.find((track) => track.id === id))
        .filter(Boolean),
    [recentTrackIds],
  );

  return (
    <section className="space-y-6">
      <Panel striped className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em]">
          Your Library
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase">Saved Blocks</h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            onClick={() => setTab("liked")}
            variant={tab === "liked" ? "primary" : "secondary"}
          >
            Liked Tracks
          </Button>
          <Button
            onClick={() => setTab("albums")}
            variant={tab === "albums" ? "primary" : "secondary"}
          >
            Albums
          </Button>
          <Button
            onClick={() => setTab("playlists")}
            variant={tab === "playlists" ? "primary" : "secondary"}
          >
            Playlists
          </Button>
          <Button
            onClick={() => setTab("recent")}
            variant={tab === "recent" ? "primary" : "secondary"}
          >
            Recent
          </Button>
        </div>
      </Panel>

      <ThemeSwitcher />

      {tab === "liked" && (
        <div>
          <SectionTitle
            eyebrow="Stored signal"
            title="Liked Tracks"
            meta={`${likedTracks.length} items`}
          />

          {likedTracks.length ? (
            <div className="grid gap-3">
              {likedTracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  index={String(index + 1).padStart(2, "0")}
                  title={track.title}
                  artist={track.artist}
                  duration={track.duration}
                  track={track}
                  queue={likedTracks}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Liked Tracks"
              description="Add tracks to build your saved signal archive."
              actionLabel="Open Search"
              onAction={() => navigate("/search")}
            />
          )}
        </div>
      )}

      {tab === "albums" && (
        <div>
          <SectionTitle
            eyebrow="Stored albums"
            title="Saved Albums"
            meta={`${savedAlbums.length} items`}
          />

          {savedAlbums.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {savedAlbums.map((album, index) => (
                <MusicCard
                  key={album.id}
                  index={index + 1}
                  title={album.title}
                  subtitle={`${album.artist} / ${album.year}`}
                  cta="Open Album"
                  to={`/album/${album.id}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Saved Albums"
              description="Save albums to create your brutalist collection."
              actionLabel="Browse Home"
              onAction={() => navigate("/")}
            />
          )}
        </div>
      )}

      {tab === "playlists" && (
        <div>
          <SectionTitle
            eyebrow="Stored playlists"
            title="Saved Playlists"
            meta={`${savedPlaylists.length} items`}
          />

          {savedPlaylists.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {savedPlaylists.map((playlist, index) => (
                <MusicCard
                  key={playlist.id}
                  index={index + 1}
                  title={playlist.title}
                  subtitle={`Playlist / ${playlist.curator}`}
                  cta="Open Playlist"
                  to={`/playlist/${playlist.id}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Saved Playlists"
              description="Save playlists to keep your queue blocks ready."
              actionLabel="Browse Home"
              onAction={() => navigate("/")}
            />
          )}
        </div>
      )}

      {tab === "recent" && (
        <div>
          <SectionTitle
            eyebrow="Playback memory"
            title="Recently Played"
            meta={`${recentTracks.length} items`}
          />

          {recentTracks.length ? (
            <div className="grid gap-3">
              {recentTracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  index={String(index + 1).padStart(2, "0")}
                  title={track.title}
                  artist={track.artist}
                  duration={track.duration}
                  track={track}
                  queue={recentTracks}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Recent Playback"
              description="Play any track to populate your recent archive."
              actionLabel="Play From Home"
              onAction={() => navigate("/")}
            />
          )}
        </div>
      )}
    </section>
  );
}
