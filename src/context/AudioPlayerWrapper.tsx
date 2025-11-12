"use client";
import { createContext, useContext, useEffect, useState } from "react";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface AudioPlayerContextProps {
    audioSource: string;
    setAudioSource: (source: string) => void;
    audioVolume: number;
    setAudioVolume: (volume: number) => void;
    isAudioMuted: boolean;
    setIsAudioMuted: (muted: boolean) => void;
    isAudioPlaying: boolean;
    setIsAudioPlaying: (playing: boolean) => void;
    isAudioLoading: boolean;
    setAudioLoading: (loading: boolean) => void;
    audioError: boolean;
    setAudioError: (error: boolean) => void;
}

interface AudioPlayerWrapperProps {
    children: React.ReactNode;
}
const AudioPlayerContext = createContext<AudioPlayerContextProps>({
    audioSource: "",
    setAudioSource: () => { },
    audioVolume: 0.8,
    setAudioVolume: () => { },
    isAudioMuted: false,
    setIsAudioMuted: () => { },
    isAudioPlaying: false,
    setIsAudioPlaying: () => { },
    isAudioLoading: false,
    setAudioLoading: () => { },
    audioError: false,
    setAudioError: () => { },
});

export function AudioPlayerWrapper({ children }: AudioPlayerWrapperProps) {
    const [audioSource, setAudioSource] = useState<string>("");
    const [audioVolume, setAudioVolume] = useState<number>(0.8);
    const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
    const [isAudioLoading, setAudioLoading] = useState<boolean>(true);
    const [audioError, setAudioError] = useState<boolean>(false);

    useEffect(() => {
        if (audioSource == "") {
            setIsAudioPlaying(false);
            setAudioError(true);
            setAudioLoading(false);
            return;
        }
        setAudioLoading(true);
        setAudioError(false);
        setIsAudioPlaying(false);
    }, [audioSource]);

    return (
        <AudioPlayerContext.Provider
            value={{
                audioSource,
                setAudioSource,
                audioVolume,
                setAudioVolume,
                isAudioMuted,
                setIsAudioMuted,
                isAudioPlaying,
                setIsAudioPlaying,
                isAudioLoading,
                setAudioLoading,
                audioError,
                setAudioError,
            }}
        >
            {children}
            <ReactPlayer
                style={{ display: "none" }}
                url={audioSource}
                volume={audioVolume}
                muted={isAudioMuted}
                playing={isAudioPlaying}
                onReady={() => {
                    console.log("Audio Source ready: ", audioSource);
                    setAudioLoading(false);
                }}
                onError={(e) => {
                    setAudioError(true);
                    setIsAudioPlaying(false);
                    setAudioLoading(false);
                    console.log("Error on loading audio stream: ", e);
                }}
            />
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayerContext() {
    return useContext(AudioPlayerContext);
}