import { MutableRefObject, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Progress } from "@nextui-org/progress";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from "@nextui-org/react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import DanmakuLib from "danmaku/dist/esm/danmaku.dom.js";
import { exitFullscreen, requestFullscreen } from "@/utils";
import { useGlobalState } from "./utils";

import fakeData from "./fake.json";
const danmakuStyle = {
  fontSize: "20px",
  color: "#ffffff",
  padding: "0px 4px",
  textShadow: "-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000",
};
let danmakuInstance: any = null;
const createDanmakuInstance = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      danmakuInstance = new DanmakuLib({
        container: document.getElementById("danmaku-container"),
        media: document.getElementById("video"),
        comments: [],
      });
      useGlobalState.setState({ danmakuInstance });
      resolve(true);
    }, 1000);
  });
};

const getInitData = () => {
  fakeData.forEach((item) => {
    danmakuInstance.emit({
      text: item.text,
      time: item.offset_time / 1000,
      style: danmakuStyle,
    });
  });
};

const ControlPanel = ({
  videoRef,
}: {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}) => {
  const [currentTime, setCurrentTime] = useState(0); // 记录当前播放时间
  const [duration, setDuration] = useState(0); // 记录视频总时长
  const [isPlaying, setIsPlaying] = useState(false); // 记录当前是否正在播放

  const [volume, setVolume] = useState(1); // 记录当前音量
  const [isFullScreen, setIsFullScreen] = useState(false); // 记录当前是否全屏
  const [danmakuText, setDanmakuText] = useState("");

  const { file } = useGlobalState((state) => state);

  useEffect(() => {
    if (!videoRef.current) return;
    const timeUpdateHandler = () => {
      setCurrentTime(videoRef.current?.currentTime ?? 0);
    };
    const durationChangeHandler = () => {
      setDuration(videoRef.current?.duration ?? 0);
    };
    const playHandler = () => {
      setIsPlaying(true);
    };
    const pauseHandler = () => {
      setIsPlaying(false);
    };
    const volumeChangeHandler = () => {
      setVolume(videoRef.current?.volume ?? 1);
    };
    videoRef.current.addEventListener("timeupdate", timeUpdateHandler);
    videoRef.current.addEventListener("durationchange", durationChangeHandler);
    videoRef.current.addEventListener("playing", playHandler);
    videoRef.current.addEventListener("pause", pauseHandler);
    videoRef.current.addEventListener("volumechange", volumeChangeHandler);

    return () => {
      videoRef.current?.removeEventListener("timeupdate", timeUpdateHandler);
      videoRef.current?.removeEventListener(
        "durationchange",
        durationChangeHandler
      );
      videoRef.current?.removeEventListener("playing", playHandler);
      videoRef.current?.removeEventListener("pause", pauseHandler);
      videoRef.current?.removeEventListener(
        "volumechange",
        volumeChangeHandler
      );
    };
  }, [videoRef]);

  useEffect(() => {
    if (!file) return;
    createDanmakuInstance().then(getInitData);

    return () => {
      danmakuInstance?.destroy();
      useGlobalState.setState({ danmakuInstance: null });
    };
  }, [file]);

  const handleDanmaku = () => {
    if (!danmakuText || !danmakuInstance) return;
    danmakuInstance.emit({
      text: danmakuText,
      time: videoRef.current?.currentTime ?? 1,
      style: { ...danmakuStyle, border: "2px solid #337ab7" },
    });
    setDanmakuText("");
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (value: number | number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value as number;
      setVolume(value as number);
    }
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (isFullScreen) {
      setIsFullScreen(false);
      exitFullscreen();
    } else {
      setIsFullScreen(true);
      requestFullscreen(videoRef.current);
    }
  };
  const playOrPauseVariants = {
    play: { rotate: 0 },
    pause: { rotate: -180 },
  };
  return (
    <motion.div className="absolute bottom-0 left-0 right-0 w-full h-14 bg-gray-800 z-10">
      <Progress
        size="sm"
        aria-label="Loading..."
        value={(currentTime / duration) * 100}
        color="primary"
      />
      <div className="flex items-center gap-x-3 h-[52px] px-4">
        <div className="flex items-center">
          {isPlaying ? (
            <motion.div
              className="rounded-full p-1 hover:bg-gray-700"
              variants={playOrPauseVariants}
              initial="play"
              animate="pause"
              transition={{ duration: 0.5 }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <PauseIcon
                fontSize="large"
                className="text-white"
                onClick={handlePlayPause}
              />
            </motion.div>
          ) : (
            <motion.div
              className="rounded-full p-1 hover:bg-gray-700"
              variants={playOrPauseVariants}
              initial="pause"
              animate="play"
              transition={{ duration: 0.5 }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <PlayArrowIcon
                fontSize="large"
                className="text-white"
                onClick={handlePlayPause}
              />
            </motion.div>
          )}
        </div>
        <div className="text-white indent-4">
          <span className="indent-4">
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}
          </span>
          <span className="px-2">/</span>
          <span className="indent-4">
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </span>
        </div>
        <div className="mx-auto flex gap-3 items-center">
          <Input
            size="sm"
            placeholder="发条弹幕支持一下～"
            isClearable
            onValueChange={(value) => setDanmakuText(value)}
            value={danmakuText}
            className="h-8 w-60 bg-gray-700 rounded"
          />
          <Button onClick={handleDanmaku} className="h-8">
            发送
          </Button>
        </div>
        <div className="flex items-center ml-auto">
          <Popover placement="top">
            <PopoverTrigger>
              <Button
                isIconOnly
                className="bg-transparent text-white"
                aria-label="Change volume"
              >
                {volume === 0 && <VolumeOffIcon />}
                {volume > 0 && volume <= 0.3 && <VolumeMuteIcon />}
                {volume > 0.3 && volume <= 0.6 && <VolumeDownIcon />}
                {volume > 0.6 && <VolumeUpIcon />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-32 p-0 rounded-md w-10 bg-gray-600">
              <div className="flex items-center flex-col gap-y-2 h-full w-full py-2 text-white">
                <span>{Math.floor(volume * 100)}</span>
                <Slider
                  size="sm"
                  disableThumbScale
                  step={0.01}
                  maxValue={1}
                  minValue={0}
                  orientation="vertical"
                  aria-label="Volume"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          isIconOnly
          aria-label="Full screen"
          className="bg-transparent text-white"
          onClick={handleFullScreen}
        >
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
