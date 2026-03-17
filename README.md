# RAW//WAVE

A brutalist music streaming interface prototype built with React, Vite, Zustand, Howler.js, React Router, and Tailwind CSS.

RAW//WAVE reimagines the music app experience through a harsh editorial design language: oversized type, rigid grids, thick borders, bold contrast, queue-focused playback, and system-style UI panels. It is not meant to be a direct Spotify copy. It is a music streaming-inspired frontend project focused on playback systems, visual identity, and product-style interaction design.

---

## Preview

RAW//WAVE includes:

- real audio playback with Howler.js
- queue-based playback controls
- album and playlist pages
- liked tracks, saved albums, and saved playlists
- recently played history
- search across tracks, albums, and playlists
- responsive layout with desktop sidebar and mobile nav
- queue drawer
- now playing panel
- brutalist theme switching

---

## Why I built it

I built RAW//WAVE to explore how a modern music product could feel under a radically different design system. Most music UI clones focus only on visuals. This project focuses on both:

- a strong brutalist brand identity
- real playback behavior
- queue and state management
- reusable UI architecture
- persistent user actions
- responsive product thinking

---

## Features

### Playback System
- play, pause, next, and previous controls
- queue-based listening flow
- seek bar and volume control
- active track syncing across views
- bottom player bar
- expanded now playing panel

### Music Browsing
- Home page with featured playlists and albums
- album detail pages
- playlist detail pages
- clickable track rows
- searchable tracks, albums, and playlists

### Library
- like and unlike tracks
- save and unsave albums
- save and unsave playlists
- recently played tracking
- local persistence using `localStorage`

### UI / UX
- brutalist design language
- theme switching
- queue drawer overlay
- responsive mobile navigation
- empty states for cleaner UX
- reusable card, panel, button, and section components

---

## Tech Stack

- **React**
- **Vite**
- **React Router**
- **Zustand**
- **Howler.js**
- **Tailwind CSS**
- **Lucide React**

---

## Project Structure

```txt
src/
  app/
    router.jsx
    store/
      playerStore.js
      libraryStore.js
      uiStore.js

  components/
    layout/
      AppShell.jsx
      Header.jsx
      Sidebar.jsx
      MobileNav.jsx
      PlayerBar.jsx
      QueueDrawer.jsx
    music/
      MusicCard.jsx
      TrackRow.jsx
    player/
      NowPlayingPanel.jsx
      VisualizerBars.jsx
    ui/
      Button.jsx
      Panel.jsx
      SectionTitle.jsx
      EmptyState.jsx
      ThemeSwitcher.jsx

  data/
    albums.js
    playlists.js
    tracks.js

  features/
    album/
      AlbumPage.jsx
    home/
      HomePage.jsx
    library/
      LibraryPage.jsx
    playlist/
      PlaylistPage.jsx
    search/
      SearchPage.jsx

  lib/
    cn.js
    formatTime.js
    storage.js

  styles/
    global.css

  main.jsx
```

## Getting Started
```bash
1. Clone the repo

git clone https://github.com/yoitsluisbro/raw-wave.git
cd raw-wave

2. Install dependencies

npm install

3. Start the development server

npm run dev
```
## Audio Setup
RAW//WAVE expects audio files inside
- public/audio

Example files
- public/audio/concrete-echo.mp3
- public/audio/steel-bloom.mp3
- public/audio/glass-static.mp3
- public/audio/night-current.mp3
- public/audio/blackout-code.mp3
- public/audio/warning-color.mp3

## Core Concepts
### Global Playback State

#### Playback is managed through Zustand and includes:

- active queue
- current track
- play/pause state
- timing and duration
- volume
- previous/next navigation

#### Persistent Library State

Library actions are stored locally:

- liked tracks
- saved albums
- saved playlists
- recent plays

#### Theme System

The app supports multiple brutalist-inspired themes:

- Mono
- Warning
- Acid
- Concrete
- Inverted

## Future Improvements

- [ ] drag-and-drop queue reordering
- [ ] playlist creation and editing
- [ ] user authentication
- [ ] backend persistence
- [ ] real uploaded cover art
- [ ] waveform visualization
- [ ] keyboard shortcuts
- [ ] audio progress smoothing
- [ ] shuffle and repeat modes

## Design Direction

### RAW//WAVE is built around a brutalist system:

- thick borders
- sharp interactions
- rigid panels
- high contrast
- oversized typography
- minimal softness
- editorial control-room energy

### Tagline:
Play loud. No polish.