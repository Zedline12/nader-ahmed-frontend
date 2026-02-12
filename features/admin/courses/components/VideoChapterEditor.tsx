"use client";

import { useRef, useState, useEffect } from "react";
import { Chapter, Moment } from "../types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ChapterList } from "./ChapterList";

interface VideoChapterEditorProps {
  initialChapters?: Chapter[];
  onChaptersChange: (chapters: Chapter[]) => void;
  onMomentsChange?: (moments: Moment[]) => void;
  onVideoChange?: (file: File | null) => void;
}

export function VideoChapterEditor({
  initialChapters = [],
  onChaptersChange,
  onMomentsChange,
  onVideoChange,
}: VideoChapterEditorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);

  // Chapter Form State
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterStart, setNewChapterStart] = useState<number>(0);
  const [newChapterEnd, setNewChapterEnd] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      if (onVideoChange) onVideoChange(file);

      // Reset state
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setNewChapterEnd(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const setStartTimeToCurrent = () => {
    setNewChapterStart(currentTime);
  };

  const setEndTimeToCurrent = () => {
    setNewChapterEnd(currentTime);
  };

  const addChapter = () => {
    if (!newChapterTitle) return;

    // Validate times
    const start = Math.max(0, newChapterStart);
    const end = Math.min(duration, newChapterEnd);

    if (start >= end) {
      alert("Start time must be less than end time");
      return;
    }

    const newChapter: Chapter = {
      title: newChapterTitle,
      start,
      end,
    };

    const updatedChapters = [...chapters, newChapter].sort(
      (a, b) => a.start - b.start,
    );
    setChapters(updatedChapters);
    onChaptersChange(updatedChapters);

    // Reset form
    setNewChapterTitle("");
    setNewChapterStart(end); // Convenience: start next chapter where last ended
    setNewChapterEnd(duration);
  };

  const deleteChapter = (index: number) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
    onChaptersChange(updatedChapters);
  };

  const jumpToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const [moments, setMoments] = useState<Moment[]>([]);
  const [newMomentLabel, setNewMomentLabel] = useState("");

  const addMoment = () => {
    if (!newMomentLabel) return;
    const timestamp = formatTime(currentTime);
    const newMoment: Moment = {
      label: newMomentLabel,
      timestamp: timestamp,
    };
    const updatedMoments = [...moments, newMoment].sort((a, b) => {
      // Simplistic sort by timestamp string (MM:SS) works for basic cases but ideally revert to seconds for sorting
      const [aMin, aSec] = a.timestamp.split(":").map(Number);
      const [bMin, bSec] = b.timestamp.split(":").map(Number);
      return aMin * 60 + aSec - (bMin * 60 + bSec);
    });
    setMoments(updatedMoments);
    if (onMomentsChange) onMomentsChange(updatedMoments);
    setNewMomentLabel("");
  };

  const deleteMoment = (index: number) => {
    const updatedMoments = moments.filter((_, i) => i !== index);
    setMoments(updatedMoments);
    if (onMomentsChange) onMomentsChange(updatedMoments);
  };

  const jumpToMoment = (timestamp: string) => {
    const [mins, secs] = timestamp.split(":").map(Number);
    const time = mins * 60 + secs;
    jumpToTime(time);
  };

  // Sync internal moments if initial prop changes (optional or handled by parent)
  // For now assuming controlled by parent mostly or self-contained.
  // Wait, I need to accept moments props.

  return (
    <div className="space-y-6">
      {!videoUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-600">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Upload Video
          </h3>
          <p className="text-sm text-gray-500 mb-4 max-w-sm">
            Drag and drop your video file here, or click to browse. MP4, WebM
            supported.
          </p>
          <Button variant="outline">Select Video File</Button>
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="relative group rounded-xl overflow-hidden bg-black aspect-video shadow-lg">
              <video
                ref={videoRef}
                src={videoUrl || ""}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
              />

              {/* Custom Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Timeline */}
                <div className="mb-4 relative h-1.5 group/timeline cursor-pointer">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-white/20 rounded-full"></div>

                  {/* Chapter markers on timeline */}
                  {chapters.map((chapter, idx) => (
                    <div
                      key={idx}
                      className="absolute h-full bg-blue-500/30 rounded-full"
                      style={{
                        left: `${(chapter.start / duration) * 100}%`,
                        width: `${((chapter.end - chapter.start) / duration) * 100}%`,
                      }}
                    />
                  ))}

                  {/* Progress bar */}
                  <div
                    className="absolute h-full bg-blue-600 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>

                  {/* Interactive Slider (Invisible but clickable) */}
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleSeek}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause size={20} fill="currentColor" />
                      ) : (
                        <Play size={20} fill="currentColor" />
                      )}
                    </button>
                    <div className="text-sm font-medium font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 h-8"
                      onClick={() => setVideoFile(null)}
                    >
                      Replace Video
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Controls */}
            <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Plus size={18} className="text-blue-600" />
                  Add New Chapter
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Chapter Title</Label>
                  <Input
                    placeholder="e.g. Introduction"
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="flex justify-between">
                      Start
                      <button
                        onClick={setStartTimeToCurrent}
                        className="text-xs text-blue-600 hover:underline font-normal"
                      >
                        Set Current
                      </button>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={newChapterStart}
                      onChange={(e) =>
                        setNewChapterStart(Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex justify-between">
                      End
                      <button
                        onClick={setEndTimeToCurrent}
                        className="text-xs text-blue-600 hover:underline font-normal"
                      >
                        Set Current
                      </button>
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={newChapterEnd}
                      onChange={(e) => setNewChapterEnd(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={addChapter}
                  disabled={!newChapterTitle}
                  className="w-full md:w-auto"
                >
                  Add Chapter Segment
                </Button>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Plus size={18} className="text-purple-600" />
                    Add Moment
                  </h3>
                </div>
                <div className="flex gap-4 items-end">
                  <div className="space-y-1.5 flex-1">
                    <Label>Moment Label</Label>
                    <Input
                      placeholder="e.g. Key Concept"
                      value={newMomentLabel}
                      onChange={(e) => setNewMomentLabel(e.target.value)}
                    />
                  </div>
                  <div className="pb-1 text-sm font-mono text-gray-500 w-16 text-center">
                    {formatTime(currentTime)}
                  </div>
                  <Button
                    onClick={addMoment}
                    disabled={!newMomentLabel}
                    variant="secondary"
                  >
                    Add Moment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl border shadow-sm flex flex-col h-[300px]">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">
                  Chapters ({chapters.length})
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Manage video segments and timestamps
                </p>
              </div>
              <div className="p-2 flex-1 overflow-hidden">
                <ChapterList
                  chapters={chapters}
                  onDelete={deleteChapter}
                  onJumpTo={jumpToTime}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm flex flex-col h-[300px]">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">
                  Moments ({moments.length})
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Specific timestamps
                </p>
              </div>
              <div className="p-2 flex-1 overflow-auto">
                <div className="space-y-2">
                  {moments.map((moment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div
                        className="flex flex-col gap-1 cursor-pointer flex-1"
                        onClick={() => jumpToMoment(moment.timestamp)}
                      >
                        <div className="font-medium text-sm text-gray-900">
                          {moment.label}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          @ {moment.timestamp}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                        onClick={() => deleteMoment(index)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
