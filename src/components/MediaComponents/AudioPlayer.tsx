import { useAudioPlayerContext } from "@/context/AudioPlayerWrapper";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaSpinner, FaVolumeHigh } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";

const AudioPlayer = () => {
    const { isAudioLoading, audioError,
        setIsAudioPlaying, isAudioPlaying,
        audioVolume, setAudioVolume } = useAudioPlayerContext();

    return (
        <div className="flex items-center gap-5 bg-radyonatin-yellow rounded-full px-10 py-5 max-w-mini-radioplayer-width mx-auto">
            <button
                onClick={() => {
                    if (!isAudioLoading && !audioError)
                        setIsAudioPlaying(!isAudioPlaying);
                }}
                className="text-radyonatin-blue p-2">
                {isAudioLoading ? <FaSpinner size={20} className="animate-spin" /> :
                    audioError ? <PiWarningCircleFill size={20} /> :
                        isAudioPlaying ? <FaPause size={20} /> : <FaPlay size={20} />
                }
            </button>
            <input
                type="range"
                className="accent-radyonatin-blue bg-slate-400 outline-0 h-2 appearance-none rounded-lg flex-1"
                min="0"
                max="100"
                defaultValue={audioVolume * 100}
                onChange={(e) => {
                    setAudioVolume(Number(e.target.value) / 100);
                }}
            />
            <div className="text-radyonatin-blue text-2xl">
                <FaVolumeHigh />
            </div>

        </div>
    );
};

export default AudioPlayer;
