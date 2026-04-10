import { useGalaxyStore } from "@/store/galaxyStore";
import { Heart, SkipBack, SkipForward, Play, Pause, Volume2, Plus, Loader2, Music } from "lucide-react";

function formatTime(s: number) {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    currentSong, isPlaying, togglePlay, nextSong, prevSong,
    favorites, toggleFavorite, volume, setVolume,
    progress, duration, setProgress, addToQueue,
    isLoadingAudio, audioNotFound,
  } = useGalaxyStore();

  if (!currentSong) {
    return (
      <div className="player-bar flex items-center justify-center gap-3 py-4">
        <Music size={16} className="text-purple-500 opacity-50" />
        <p className="text-purple-300 text-sm opacity-50">Click a planet or song to play</p>
      </div>
    );
  }

  const isFav = favorites.includes(currentSong.id);
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="player-bar">
      {/* Progress bar */}
      <div
        className="progress-track"
        onClick={(e) => {
          if (!duration) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          setProgress((x / rect.width) * duration);
        }}
      >
        <div
          className="progress-fill"
          style={{ width: isLoadingAudio ? "0%" : `${pct}%` }}
        />
        {isLoadingAudio && (
          <div className="progress-loading" />
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        {/* Song info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold relative overflow-hidden"
            style={{
              background: currentSong.color,
              boxShadow: `0 0 16px ${currentSong.color}80`,
            }}
          >
            {isLoadingAudio ? (
              <Loader2 size={14} className="text-white animate-spin" />
            ) : (
              <span>{currentSong.genre.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-white text-sm font-semibold truncate">{currentSong.title}</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 flex-shrink-0 border border-purple-700/40">
                30s preview
              </span>
            </div>
            <p className="text-purple-300 text-xs truncate">
              {isLoadingAudio
                ? "Searching iTunes..."
                : audioNotFound
                  ? `${currentSong.artist} · Preview unavailable`
                  : currentSong.artist}
            </p>
          </div>
          <button
            className={`ml-1 flex-shrink-0 transition-all ${isFav ? "text-pink-400 scale-110" : "text-gray-500 hover:text-pink-400"}`}
            onClick={() => toggleFavorite(currentSong.id)}
          >
            <Heart size={16} fill={isFav ? "currentColor" : "none"} />
          </button>
          <button
            className="flex-shrink-0 text-gray-500 hover:text-purple-400 transition-colors"
            onClick={() => addToQueue(currentSong)}
            title="Add to queue"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-shrink-0 mx-4">
          <span className="text-purple-400 text-xs w-8 text-right">{formatTime(progress)}</span>
          <button
            onClick={prevSong}
            className="text-purple-300 hover:text-white transition-colors"
            disabled={isLoadingAudio}
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            disabled={isLoadingAudio || audioNotFound}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
            style={{
              background: currentSong.color,
              boxShadow: !isLoadingAudio && !audioNotFound
                ? `0 0 20px ${currentSong.color}60`
                : "none",
            }}
          >
            {isLoadingAudio ? (
              <Loader2 size={16} className="text-white animate-spin" />
            ) : isPlaying ? (
              <Pause size={18} className="text-white" />
            ) : (
              <Play size={18} className="text-white ml-0.5" />
            )}
          </button>
          <button
            onClick={nextSong}
            className="text-purple-300 hover:text-white transition-colors"
            disabled={isLoadingAudio}
          >
            <SkipForward size={20} />
          </button>
          <span className="text-purple-400 text-xs w-8">{formatTime(duration)}</span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 flex-1 justify-end max-w-32">
          <Volume2 size={14} className="text-purple-400 flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider w-full"
          />
        </div>
      </div>
    </div>
  );
}
