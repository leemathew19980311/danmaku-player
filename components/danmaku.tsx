import debounce from "lodash-es/debounce";
import { MutableRefObject, use, useEffect, useRef, useState } from "react";
import { useGlobalState } from "./utils";

const Danmaku = ({
  videoRef,
}: {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { file, danmakuInstance } = useGlobalState((state) => state);

  useEffect(() => {
    const handleResize = debounce(
      () => {
        if (videoRef.current) {
          const width = videoRef.current.offsetWidth;
          const height = videoRef.current.offsetHeight;
          danmakuInstance && danmakuInstance.resize();
          setSize({ width, height });
        }
      },
      500,
      {
        maxWait: 1000,
      }
    );
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [file]);

  return (
    <div
      id="danmaku-container"
      className="absolute top-0 left-0 w-full h-full bg-transparent"
      style={{ width: size.width + "px", height: size.height + "px" }}
    ></div>
  );
};

export default Danmaku;
