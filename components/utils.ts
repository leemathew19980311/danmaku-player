import { MutableRefObject, useEffect, useRef, useState } from "react";
import { create } from "zustand";

const useGlobalState = create<{
  file: File | undefined;
  setFile: (file: File | undefined) => void;
}>((set) => ({
  file: undefined,
  setFile: (file) => set(() => ({ file })),
}));

interface VideoStatus {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  danmakuSpeed: number;
}

// const useVideoContorl = create<
//   VideoStatus & {
//     setVideoStatus: (data: Partial<VideoStatus>) => void;
//   }
// >((set) => ({
//   videoRef: { current: null },
//   currentTime: 0,
//   duration: 0,
//   danmakuSpeed: 100, //px/s
//   isPlaying: false,
//   setVideoStatus: (data: Partial<VideoStatus>) =>
//     set((state) => ({ ...state, ...data })),
// }));

// interface DanmakuType {
//   danmaku_id: string;
//   danmaku_type: number;
//   danmaku_type_bits: number;
//   digg_count: number;
//   digg_type: number;
//   dislike_type: number;
//   extra: {
//     big_thumb: null;
//   };
//   from_copy: boolean;
//   has_emoji: boolean;
//   item_id: string;
//   offset_time: number;
//   score: number;
//   show_copy: boolean;
//   show_digg: boolean;
//   status: number;
//   text: string;
//   user_id: string;
// }
// const useDanmakuLoader = (initialDanmakuList: DanmakuType[] = []) => {
//   const [danmakuList, setDanmakuList] =
//     useState<DanmakuType[]>(initialDanmakuList);
//   const { videoRef, danmakuSpeed } = useVideoContorl();
//   const cursorRef = useRef(0);
//   const videoSpeed = videoRef.current?.playbackRate || 1;
//   const width = 600; //px
//   const preLoadTime = width / (danmakuSpeed * videoSpeed);
//   const danmakuContainer = document.querySelector(
//     "#danmaku-container"
//   ) as HTMLDivElement;
//   useEffect(() => {
//     let animationFrameId: number;
//     let lastExecutionTime = 0;

//     const checkDanmaku = (timestamp: number) => {
//       if (timestamp - lastExecutionTime >= 1000) {
//         // 每秒执行一次
//         lastExecutionTime = timestamp;

//         console.log(danmakuContainer);
//         const currentTime = videoRef.current?.currentTime || 0;
//         const currentMsTime = currentTime * 1000; //ms
//         const startCursor = cursorRef.current;
//         const endMsTime = (currentTime + preLoadTime) * 1000; //ms
//         for (let i = startCursor; i < danmakuList.length; i++) {
//           const { offset_time, text } = danmakuList[i];
//           if (offset_time < endMsTime) {
//             const danmaku = document.createElement("span");
//             danmaku.innerText = text;
//             const offset =
//               ((currentMsTime - offset_time) / 1000) * danmakuSpeed; // 计算偏移量
//             danmaku.setAttribute(
//               "style",
//               "position:absolute;top:0;white-space: nowrap;"
//             );
//             danmaku.style.left = `${Math.abs(offset) + width}px`;
//             danmaku.animate({
//               duration: Math.abs((currentMsTime - offset_time) / 1000),
//               easing: "linear",
//             });
//             danmakuContainer.appendChild(danmaku);
//             cursorRef.current = i + 1;
//           } else {
//             break;
//           }
//         }
//       }

//       animationFrameId = requestAnimationFrame(checkDanmaku);
//     };

//     animationFrameId = requestAnimationFrame(checkDanmaku);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [danmakuList]);

//   return {
//     setDanmakuList,
//   };
// };

export { useGlobalState };
