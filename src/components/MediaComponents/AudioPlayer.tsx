import React, { useRef, useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";

const AudioPlayer = ({ src }: { src: string }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            if (audio) {
                setCurrentTime(audio.currentTime);
            }
        };

        if (audio) {
            audio.addEventListener("timeupdate", updateTime);
            audio.volume = volume;
        }

        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", updateTime);
            }
        };
    }, [src, volume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        const newVolume = Number(e.target.value) / 100;
        setVolume(newVolume);
        if (audio) {
            audio.volume = newVolume;
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="flex items-center gap-5 bg-radyonatin-yellow rounded-full px-10 py-5 max-w-mini-radioplayer-width mx-auto">
            <audio ref={audioRef} src={src}></audio>

            <button onClick={togglePlay} className="text-radyonatin-blue text-2xl">
                {isPlaying ?
                    <FaPause />
                    : <FaPlay />}
            </button>

            {/* TODOS: Set font to Karla */}
            <span className="font-semibold text-sm">{formatTime(currentTime)} / --:--</span>

            <input
                type="range"
                className="accent-radyonatin-blue bg-slate-400 outline-0 h-2 appearance-none rounded-lg flex-1"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
            />
            <div className="text-radyonatin-blue text-2xl">
                <FaVolumeHigh />
            </div>

        </div>
    );
};

export default AudioPlayer;
