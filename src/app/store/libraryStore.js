import { create } from 'zustand'
import { loadJSON, saveJSON } from '../../lib/storage'

const STORAGE_KEY = 'raw-wave-library'

const initialState = loadJSON(STORAGE_KEY, {
  likedTrackIds: [],
  savedAlbumIds: [],
  savedPlaylistIds: [],
  recentTrackIds: [],
})

function persist(state) {
  saveJSON(STORAGE_KEY, {
    likedTrackIds: state.likedTrackIds,
    savedAlbumIds: state.savedAlbumIds,
    savedPlaylistIds: state.savedPlaylistIds,
    recentTrackIds: state.recentTrackIds,
  })
}

export const useLibraryStore = create((set) => ({
  likedTrackIds: initialState.likedTrackIds,
  savedAlbumIds: initialState.savedAlbumIds,
  savedPlaylistIds: initialState.savedPlaylistIds,
  recentTrackIds: initialState.recentTrackIds,

  toggleLikedTrack: (trackId) => {
    set((state) => {
      const likedTrackIds = state.likedTrackIds.includes(trackId)
        ? state.likedTrackIds.filter((id) => id !== trackId)
        : [trackId, ...state.likedTrackIds]

      const nextState = { ...state, likedTrackIds }
      persist(nextState)
      return { likedTrackIds }
    })
  },

  toggleSavedAlbum: (albumId) => {
    set((state) => {
      const savedAlbumIds = state.savedAlbumIds.includes(albumId)
        ? state.savedAlbumIds.filter((id) => id !== albumId)
        : [albumId, ...state.savedAlbumIds]

      const nextState = { ...state, savedAlbumIds }
      persist(nextState)
      return { savedAlbumIds }
    })
  },

  toggleSavedPlaylist: (playlistId) => {
    set((state) => {
      const savedPlaylistIds = state.savedPlaylistIds.includes(playlistId)
        ? state.savedPlaylistIds.filter((id) => id !== playlistId)
        : [playlistId, ...state.savedPlaylistIds]

      const nextState = { ...state, savedPlaylistIds }
      persist(nextState)
      return { savedPlaylistIds }
    })
  },

  pushRecentTrack: (trackId) => {
    set((state) => {
      const recentTrackIds = [
        trackId,
        ...state.recentTrackIds.filter((id) => id !== trackId),
      ].slice(0, 12)

      const nextState = { ...state, recentTrackIds }
      persist(nextState)
      return { recentTrackIds }
    })
  },
}))