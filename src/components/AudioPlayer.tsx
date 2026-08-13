import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Label } from "@/components/ui/label";

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ audioUrl }: { audioUrl: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    if (audio) {
      audio.currentTime = newTime;
    }

    setCurrentTime(newTime);
  };

  const handleVolumeChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted && audio) {
      if (audio) {
        audio.volume = volume || 1;
        setIsMuted(false);
      }
      if (volume === 0) setVolume(1);
    } else {
      if (audio) {
        audio.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setHoverPercent(percent);
  };

  const handleMouseLeave = () => setHoverPercent(null);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const hoverTime =
    duration && hoverPercent !== null ? (hoverPercent / 100) * duration : 0;

  return (
    <div className="flex flex-col gap-3">
      <Label>Audio Preview</Label>

      <div className="bg-primary/10 border border-primary/40 rounded-xl px-4 py-2 flex items-center gap-1 w-full">
        {/* Tombol play/pause */}
        <button
          type="button"
          onClick={togglePlay}
          className="shrink-0 size-9 rounded-full bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? (
            <Pause className="size-4 text-white" fill="white" />
          ) : (
            <Play className="size-4 text-white ml-0.5" fill="white" />
          )}
        </button>

        {/* Progress bar + waktu */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-black w-10 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>

          <div
            ref={barRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex-1 h-1 group"
          >
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer z-10"
            />
            <div className="absolute inset-0 h-1 rounded-full bg-gray-400" />
            <div
              className="absolute inset-y-0 left-0 h-1 rounded-full bg-gray-900 group-hover:bg-primary transition-colors"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPercent}% - 6px)` }}
            />
            {hoverPercent !== null && (
              <div
                className="absolute -top-8 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                style={{ left: `${hoverPercent}%` }}
              >
                {formatTime(hoverTime)}
              </div>
            )}
          </div>

          <span className="text-xs text-black w-10 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log("ok");
              toggleMute();
            }}
            className="text-black hover:text-primary"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <div className="relative w-16 h-1 group">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer z-10"
            />
            <div className="absolute inset-0 h-1 rounded-full bg-gray-400" />
            <div
              className="absolute inset-y-0 left-0 h-1 rounded-full bg-gray-900 group-hover:bg-primary transition-colors"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${(isMuted ? 0 : volume) * 100}% - 6px)` }}
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        src={audioUrl}
        className="hidden"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
