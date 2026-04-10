import { create } from "zustand";
import { Song, SONGS } from "@/data/songs";

interface GalaxyStore {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  isLoadingAudio: boolean;
  audioNotFound: boolean;
  queue: Song[];
  favorites: string[];
  recentlyPlayed: Song[];
  searchQuery: string;
  selectedGenre: string | null;
  selectedMood: string | null;
  volume: number;
  progress: number;
  duration: number;
  audioElement: HTMLAudioElement | null;
  previewCache: Record<string, string | null>;

  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  addToQueue: (song: Song) => void;
  toggleFavorite: (songId: string) => void;
  setSearchQuery: (q: string) => void;
  setSelectedGenre: (genre: string | null) => void;
  setSelectedMood: (mood: string | null) => void;
  setVolume: (v: number) => void;
  setProgress: (p: number) => void;
  setDuration: (d: number) => void;
  discoverRandom: () => void;
  getAIMoodRecommendations: (mood: string) => Song[];
}

async function fetchItunesPreview(song: Song): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${song.title} ${song.artist}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=5&entity=song`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.results || data.results.length === 0) return null;

    // Try to find best match: prefer same title
    const titleLower = song.title.toLowerCase();
    const match =
      data.results.find((r: { trackName?: string; previewUrl?: string }) =>
        r.trackName?.toLowerCase().includes(titleLower) && r.previewUrl,
      ) || data.results.find((r: { previewUrl?: string }) => r.previewUrl);

    return match?.previewUrl ?? null;
  } catch {
    return null;
  }
}

export const useGalaxyStore = create<GalaxyStore>((set, get) => {
  const audio = typeof window !== "undefined" ? new Audio() : null;

  if (audio) {
    audio.volume = 0.7;
    audio.crossOrigin = "anonymous";
    audio.addEventListener("timeupdate", () => {
      set({ progress: audio.currentTime });
    });
    audio.addEventListener("loadedmetadata", () => {
      set({ duration: audio.duration });
    });
    audio.addEventListener("ended", () => {
      get().nextSong();
    });
    audio.addEventListener("error", () => {
      set({ isLoadingAudio: false, isPlaying: false, audioNotFound: true });
    });
    audio.addEventListener("canplay", () => {
      set({ isLoadingAudio: false });
    });
  }

  return {
    songs: SONGS,
    currentSong: null,
    isPlaying: false,
    isLoadingAudio: false,
    audioNotFound: false,
    queue: [],
    favorites: [],
    recentlyPlayed: [],
    searchQuery: "",
    selectedGenre: null,
    selectedMood: null,
    volume: 0.7,
    progress: 0,
    duration: 0,
    audioElement: audio,
    previewCache: {},

    playSong: async (song) => {
      const { audioElement, recentlyPlayed, previewCache } = get();

      // Stop current audio immediately
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }

      set({
        currentSong: song,
        isPlaying: false,
        isLoadingAudio: true,
        audioNotFound: false,
        progress: 0,
        duration: 0,
        recentlyPlayed: [song, ...recentlyPlayed.filter((s) => s.id !== song.id)].slice(0, 20),
      });

      let previewUrl: string | null = null;

      // Check cache first
      if (song.id in previewCache) {
        previewUrl = previewCache[song.id];
      } else {
        previewUrl = await fetchItunesPreview(song);
        set((s) => ({
          previewCache: { ...s.previewCache, [song.id]: previewUrl },
        }));
      }

      // Make sure user hasn't switched to another song while loading
      if (get().currentSong?.id !== song.id) return;

      if (previewUrl && audioElement) {
        audioElement.src = previewUrl;
        audioElement.volume = get().volume;
        try {
          await audioElement.play();
          set({ isPlaying: true, isLoadingAudio: false, audioNotFound: false });
        } catch {
          set({ isPlaying: false, isLoadingAudio: false, audioNotFound: true });
        }
      } else {
        set({ isLoadingAudio: false, audioNotFound: true, isPlaying: false });
      }
    },

    togglePlay: () => {
      const { audioElement, isPlaying, currentSong } = get();
      if (!currentSong) return;
      if (audioElement) {
        if (isPlaying) {
          audioElement.pause();
          set({ isPlaying: false });
        } else {
          audioElement.play().then(() => {
            set({ isPlaying: true });
          }).catch(() => {});
        }
      }
    },

    nextSong: () => {
      const { currentSong, songs, queue } = get();
      if (queue.length > 0) {
        const [next, ...rest] = queue;
        set({ queue: rest });
        get().playSong(next);
        return;
      }
      if (!currentSong) return;
      const idx = songs.findIndex((s) => s.id === currentSong.id);
      const next = songs[(idx + 1) % songs.length];
      get().playSong(next);
    },

    prevSong: () => {
      const { currentSong, songs } = get();
      if (!currentSong) return;
      const idx = songs.findIndex((s) => s.id === currentSong.id);
      const prev = songs[(idx - 1 + songs.length) % songs.length];
      get().playSong(prev);
    },

    addToQueue: (song) => {
      set((s) => ({ queue: [...s.queue, song] }));
    },

    toggleFavorite: (songId) => {
      set((s) => ({
        favorites: s.favorites.includes(songId)
          ? s.favorites.filter((id) => id !== songId)
          : [...s.favorites, songId],
      }));
    },

    setSearchQuery: (q) => set({ searchQuery: q }),
    setSelectedGenre: (genre) => set({ selectedGenre: genre }),
    setSelectedMood: (mood) => set({ selectedMood: mood }),

    setVolume: (v) => {
      const { audioElement } = get();
      if (audioElement) audioElement.volume = v;
      set({ volume: v });
    },

    setProgress: (p) => {
      const { audioElement } = get();
      if (audioElement) audioElement.currentTime = p;
      set({ progress: p });
    },

    setDuration: (d) => set({ duration: d }),

    discoverRandom: () => {
      const { songs } = get();
      const random = songs[Math.floor(Math.random() * songs.length)];
      get().playSong(random);
    },

    getAIMoodRecommendations: (mood) => {
      const { songs } = get();
      return songs.filter((s) => s.mood === mood).slice(0, 8);
    },
  };
});
