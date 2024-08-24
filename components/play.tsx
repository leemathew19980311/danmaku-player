import { motion, Variants } from "framer-motion";
import { useGlobalState } from "./utils";
import { useEffect, useRef, useState } from "react";
import ControlPanel from "./controlPanel";
import Danmaku from "./danmaku";
import debounce from "lodash-es/debounce";
import TopControlPanel from "./topControlPanel";
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
  const { file, danmakuInstance } = useGlobalState();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isControlPanelVisible, setIsControlPanelVisible] = useState(true);
  useEffect(() => {
    const handleLastMousemove = debounce(() => {
      setIsControlPanelVisible(false);
    }, 5000);
    const mouseTrackHandler = () => {
      setIsControlPanelVisible(true);
      handleLastMousemove();
    };
    document.addEventListener("mousemove", mouseTrackHandler);
    return () => {
      document.removeEventListener("mousemove", mouseTrackHandler);
    };
  }, []);

  return (
    <motion.div
      variants={variants}
      className="h-full w-full relative"
      id="playerContainer"
    >
      <TopControlPanel isControlPanelVisible={isControlPanelVisible} />
      <video
        id="video"
        ref={videoRef}
        src={file && URL.createObjectURL(file)}
        preload="auto"
        className="block w-full h-full visible m-auto"
        style={{ contentVisibility: "visible" }}
      ></video>

      <ControlPanel
        videoRef={videoRef}
        isControlPanelVisible={isControlPanelVisible}
      />
      <Danmaku videoRef={videoRef} />
    </motion.div>
  );
};

export default Play;
