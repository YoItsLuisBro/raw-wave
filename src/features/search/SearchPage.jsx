import { useMemo, useState } from "react";
import Panel from "../../components/ui/Panel";
import SectionTitle from "../../components/ui/SectionTitle";
import Button from "../../components/ui/Button";
import MusicCard from "../../components/music/MusicCard";
import TrackRow from "../../components/music/TrackRow";
import EmptyState from "../../components/ui/EmptyState";
import { albums } from "../../data/albums";
import { playlists } from "../../data/playlists";
import { tracks } from "../../data/tracks";

const moods = ["RAGE", "FOCUS", "STATIC", "AFTERMIDNIGHT"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTracks = useMemo(() => {
    if (!normalizedQuery) return tracks;

    return tracks.filter((track) =>
      `${track.title} ${track.artist}`.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredAlbums = useMemo(() => {
    if (!normalizedQuery) return albums;

    return albums.filter((album) =>
      `${album.title} ${album.artist}`.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredPlaylists = useMemo(() => {
    if (!normalizedQuery) return playlists;

    return playlists.filter((playlist) =>
      `${playlist.title} ${playlist.curator}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const nothingFound =
    normalizedQuery &&
    filteredTracks.length === 0 &&
    filteredAlbums.length === 0 &&
    filteredPlaylists.length === 0;

  return (
    <section className="space-y-6">
      <Panel className="p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em]">
          Search
        </p>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH TRACKS, ARTISTS, PLAYLISTS"
          className="mt-3 w-full border-4 border-black bg-neutral-100 px-4 py-4 text-sm font-black uppercase outline-none placeholder:text-neutral-500"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "primary" : "secondary"}
            size="sm"
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("tracks")}
            variant={filter === "tracks" ? "primary" : "secondary"}
            size="sm"
          >
            Tracks
          </Button>
          <Button
            onClick={() => setFilter("albums")}
            variant={filter === "albums" ? "primary" : "secondary"}
            size="sm"
          >
            Albums
          </Button>
          <Button
            onClick={() => setFilter("playlists")}
            variant={filter === "playlists" ? "primary" : "secondary"}
            size="sm"
          >
            Playlists
          </Button>
        </div>
      </Panel>

      {!normalizedQuery && filter === "all" ? (
        <div>
          <SectionTitle
            eyebrow="Browse by signal"
            title="Mood Blocks"
            meta="04 zones"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {moods.map((item) => (
              <Panel key={item} tone="black" className="p-6">
                <h2 className="text-2xl font-black uppercase">{item}</h2>
              </Panel>
            ))}
          </div>
        </div>
      ) : null}

      {nothingFound ? (
        <EmptyState
          title="No Matches Found"
          description="Try another search term to scan the RAW//WAVE archive."
        />
      ) : (
        <>
          {(filter === "all" || filter === "tracks") && (
            <div>
              <SectionTitle
                eyebrow="Matching tracks"
                title="Track Results"
                meta={`${filteredTracks.length} items`}
              />

              <div className="grid gap-3">
                {filteredTracks.map((track, index) => (
                  <TrackRow
                    key={track.id}
                    index={String(index + 1).padStart(2, "0")}
                    title={track.title}
                    artist={track.artist}
                    duration={track.duration}
                    track={track}
                    queue={filteredTracks}
                  />
                ))}
              </div>
            </div>
          )}

          {(filter === "all" || filter === "albums") && (
            <div>
              <SectionTitle
                eyebrow="Matching albums"
                title="Album Results"
                meta={`${filteredAlbums.length} items`}
              />

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAlbums.map((album, index) => (
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
            </div>
          )}

          {(filter === "all" || filter === "playlists") && (
            <div>
              <SectionTitle
                eyebrow="Matching playlists"
                title="Playlist Results"
                meta={`${filteredPlaylists.length} items`}
              />

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredPlaylists.map((playlist, index) => (
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
            </div>
          )}
        </>
      )}
    </section>
  );
}
