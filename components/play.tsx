import { motion, Variants } from "framer-motion";
import { useGlobalState } from "./utils";
import { useEffect, useRef } from "react";
import ControlPanel from "./controlPanel";
import flvjs from "flv.js";
import Danmaku from "./danmaku";
const variants: Variants = {
  openPlayer: {
    scale: 1,
    display: "block",
  },
  closePlayer: {
    scale: 0,
    display: "none",
  },
};
const Play: React.FC = () => {
  const file = useGlobalState((state) => state.file);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!file || !videoRef.current) return;
    const flvPlayer = flvjs.createPlayer({
      type: file.type,
      url: URL.createObjectURL(file),
    });
    flvPlayer.attachMediaElement(videoRef.current);
    flvPlayer.load();
  }, [file, videoRef]);

  return (
    <motion.div variants={variants} className="h-full w-full relative">
      <video
        id="video"
        ref={videoRef}
        preload="auto"
        className="block w-full h-full visible m-auto"
        style={{ contentVisibility: "visible" }}
      ></video>

      <ControlPanel videoRef={videoRef} />
      <Danmaku videoRef={videoRef} />
    </motion.div>
  );
};

export default Play;
