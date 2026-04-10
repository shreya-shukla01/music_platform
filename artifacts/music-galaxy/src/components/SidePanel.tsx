import { useState } from "react";
import { useGalaxyStore } from "@/store/galaxyStore";
import { GENRES, MOODS, PLAYLISTS, Song } from "@/data/songs";
import { Search, Heart, Clock, List, Sparkles, Zap, ChevronRight } from "lucide-react";

type Tab = "search" | "favorites" | "recent" | "playlists" | "ai";

export default function SidePanel() {
  const [tab, setTab] = useState<Tab>("search");
  const {
    searchQuery, setSearchQuery, selectedGenre, setSelectedGenre,
    selectedMood, setSelectedMood, favorites, songs,
    recentlyPlayed, playSong, currentSong, discoverRandom,
    getAIMoodRecommendations,
  } = useGalaxyStore();

  const [aiMood, setAiMood] = useState<string>("");
  const [aiResults, setAiResults] = useState<Song[]>([]);

  const favSongs = songs.filter((s) => favorites.includes(s.id));

  const filteredSongs = songs.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
    const matchG = !selectedGenre || s.genre === selectedGenre;
    const matchM = !selectedMood || s.mood === selectedMood;
    return matchQ && matchG && matchM;
  });

  const tabs = [
    { id: "search" as Tab, icon: <Search size={16} />, label: "Search" },
    { id: "favorites" as Tab, icon: <Heart size={16} />, label: "Favorites" },
    { id: "recent" as Tab, icon: <Clock size={16} />, label: "Recent" },
    { id: "playlists" as Tab, icon: <List size={16} />, label: "Playlists" },
    { id: "ai" as Tab, icon: <Sparkles size={16} />, label: "AI" },
  ];

  return (
    <div className="side-panel flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <h2 className="text-white font-bold text-lg orbitron">GALAXY</h2>
        </div>
        <p className="text-purple-400 text-xs">AI 3D Music Explorer</p>
      </div>

      <div className="flex border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 flex flex-col items-center gap-1 text-xs transition-all ${
              tab === t.id
                ? "text-purple-300 border-b-2 border-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t.icon}
            <span className="text-[10px]">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        {tab === "search" && (
          <div className="p-3 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="search"
                placeholder="Search songs or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-8"
              />
            </div>

            <div>
              <p className="text-purple-400 text-xs mb-2 uppercase tracking-wider">Genre</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedGenre(null)}
                  className={`pill ${!selectedGenre ? "pill-active" : ""}`}
                >All</button>
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(selectedGenre === g ? null : g)}
                    className={`pill ${selectedGenre === g ? "pill-active" : ""}`}
                  >{g}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-purple-400 text-xs mb-2 uppercase tracking-wider">Mood</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedMood(null)}
                  className={`pill ${!selectedMood ? "pill-active" : ""}`}
                >All</button>
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMood(selectedMood === m ? null : m)}
                    className={`pill ${selectedMood === m ? "pill-active" : ""}`}
                  >{m}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-purple-400 text-xs mb-2 uppercase tracking-wider">{filteredSongs.length} Songs</p>
              <div className="space-y-1">
                {filteredSongs.map((s) => (
                  <SongRow key={s.id} song={s} isActive={currentSong?.id === s.id} onPlay={playSong} />
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "favorites" && (
          <div className="p-3">
            <p className="text-purple-400 text-xs mb-3 uppercase tracking-wider">{favSongs.length} Favorites</p>
            {favSongs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Heart size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No favorites yet</p>
              </div>
            )}
            <div className="space-y-1">
              {favSongs.map((s) => (
                <SongRow key={s.id} song={s} isActive={currentSong?.id === s.id} onPlay={playSong} />
              ))}
            </div>
          </div>
        )}

        {tab === "recent" && (
          <div className="p-3">
            <p className="text-purple-400 text-xs mb-3 uppercase tracking-wider">Recently Played</p>
            {recentlyPlayed.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No history yet</p>
              </div>
            )}
            <div className="space-y-1">
              {recentlyPlayed.map((s) => (
                <SongRow key={s.id} song={s} isActive={currentSong?.id === s.id} onPlay={playSong} />
              ))}
            </div>
          </div>
        )}

        {tab === "playlists" && (
          <div className="p-3 space-y-3">
            {PLAYLISTS.map((pl) => {
              const plSongs = songs.filter((s) => pl.songIds.includes(s.id));
              return (
                <div key={pl.id} className="glass-card p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{pl.emoji}</span>
                      <span className="text-white text-sm font-semibold">{pl.name}</span>
                    </div>
                    <span className="text-purple-400 text-xs">{plSongs.length}</span>
                  </div>
                  <div className="space-y-1">
                    {plSongs.map((s) => (
                      <SongRow key={s.id} song={s} isActive={currentSong?.id === s.id} onPlay={playSong} compact />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "ai" && (
          <div className="p-3 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-purple-400" />
                <p className="text-white text-sm font-semibold">AI Mood Recommendations</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setAiMood(m);
                      setAiResults(getAIMoodRecommendations(m));
                    }}
                    className={`pill ${aiMood === m ? "pill-active" : ""}`}
                  >{m}</button>
                ))}
              </div>
              {aiResults.length > 0 && (
                <div className="space-y-1">
                  <p className="text-purple-400 text-xs mb-2">AI suggests {aiResults.length} songs for {aiMood} mood:</p>
                  {aiResults.map((s) => (
                    <SongRow key={s.id} song={s} isActive={currentSong?.id === s.id} onPlay={playSong} />
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-yellow-400" />
                <p className="text-white text-sm font-semibold">Black Hole Discovery</p>
              </div>
              <p className="text-gray-400 text-xs mb-3">
                Let the black hole pull you into a random sonic journey
              </p>
              <button
                onClick={discoverRandom}
                className="w-full py-2 rounded-lg text-white text-sm font-semibold transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #c0392b)",
                  boxShadow: "0 0 20px rgba(255, 107, 53, 0.4)",
                }}
              >
                Discover Random Song
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface SongRowProps {
  song: Song;
  isActive: boolean;
  onPlay: (song: Song) => void;
  compact?: boolean;
}

function SongRow({ song, isActive, onPlay, compact }: SongRowProps) {
  return (
    <button
      onClick={() => onPlay(song)}
      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-all group ${
        isActive ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div
        className="flex-shrink-0 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
        style={{
          width: compact ? 24 : 28,
          height: compact ? 24 : 28,
          background: song.color,
          boxShadow: isActive ? `0 0 10px ${song.color}80` : undefined,
        }}
      >
        {song.genre.slice(0, 2)}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate ${compact ? "text-[11px]" : "text-xs"} ${isActive ? "text-purple-300 font-semibold" : "text-gray-200"}`}>
          {song.title}
        </p>
        {!compact && (
          <p className="text-[10px] text-gray-500 truncate">{song.artist}</p>
        )}
      </div>
      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse flex-shrink-0" />}
      {!isActive && <ChevronRight size={12} className="text-gray-600 opacity-0 group-hover:opacity-100 flex-shrink-0" />}
    </button>
  );
}
