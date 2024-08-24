import { motion } from "framer-motion";
import WestIcon from "@mui/icons-material/West";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Button } from "@nextui-org/react";
import { useGlobalState } from "./utils";
const TopControlPanel = ({
  isControlPanelVisible,
}: {
  isControlPanelVisible: boolean;
}) => {
  const { setFile, danmakuInstance, setDanmakuInstance } = useGlobalState();
  const controlPanelVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
    hidden: {
      opacity: 0,
      y: -56,
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };
  const returnToHome = () => {
    setFile(undefined);
    danmakuInstance.destroy();
    setDanmakuInstance(undefined);
  };
  return (
    <motion.div
      className="absolute top-0 left-0 w-full flex justify-between items-center p-2 bg-gray-800 z-10"
      variants={controlPanelVariants}
      initial="hidden"
      animate={isControlPanelVisible ? "visible" : "hidden"}
    >
      <Button isIconOnly className="bg-gray-800" onClick={returnToHome}>
        <WestIcon className="text-white" />
      </Button>
      <Button isIconOnly className="bg-gray-800">
        <FormatListBulletedIcon className="text-white" />
      </Button>
    </motion.div>
  );
};

export default TopControlPanel;
