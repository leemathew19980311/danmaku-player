import { motion, Variants } from "framer-motion";
import { useGlobalState } from "./utils";
import { useRef } from "react";
import ControlPanel from "./controlPanel";
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
  const {file,danmakuInstance} = useGlobalState();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <motion.div variants={variants} className="h-full w-full relative">
      <video
        id="video"
        ref={videoRef}
        src={file && URL.createObjectURL(file)}
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
