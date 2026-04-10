import { useMemo } from "react";
import Galaxy3D from "@/components/Galaxy3D";
import SidePanel from "@/components/SidePanel";
import MusicPlayer from "@/components/MusicPlayer";
import { useGalaxyStore } from "@/store/galaxyStore";

export default function GalaxyPage() {
  const { songs, searchQuery, selectedGenre, selectedMood } = useGalaxyStore();

  const filteredIds = useMemo(() => {
    const hasFilter = !!(searchQuery || selectedGenre || selectedMood);
    if (!hasFilter) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const filtered = songs.filter((s) => {
      const matchQ = !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
      const matchG = !selectedGenre || s.genre === selectedGenre;
      const matchM = !selectedMood || s.mood === selectedMood;
      return matchQ && matchG && matchM;
    });
    return new Set(filtered.map((s) => s.id));
  }, [songs, searchQuery, selectedGenre, selectedMood]);

  return (
    <div className="galaxy-layout">
      <div className="side-panel-container">
        <SidePanel />
      </div>
      <div className="galaxy-canvas-container">
        <Galaxy3D songs={songs} filteredIds={filteredIds} />
        <div className="galaxy-overlay-text">
          <p className="text-purple-400/60 text-xs text-center">
            Click a planet to play &bull; Drag to rotate &bull; Scroll to zoom
          </p>
        </div>
      </div>
      <div className="player-container">
        <MusicPlayer />
      </div>
    </div>
  );
}
