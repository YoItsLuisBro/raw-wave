import { createBrowserRouter } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import HomePage from "../features/home/HomePage";
import SearchPage from "../features/search/SearchPage";
import LibraryPage from "../features/library/LibraryPage";
import AlbumPage from "../features/album/AlbumPage";
import PlaylistPage from "../features/playlist/PlaylistPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "album/:albumId", element: <AlbumPage /> },
      { path: "playlist/:playlistId", element: <PlaylistPage /> },
    ],
  },
]);
