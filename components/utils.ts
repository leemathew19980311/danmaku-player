import { create } from "zustand";

const useGlobalState = create<{
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  danmakuInstance: any | null;
  setDanmakuInstance: (danmakuInstance: any) => void;
}>((set) => ({
  file: undefined,
  danmakuInstance: null,
  setFile: (file) => set(() => ({ file })),
  setDanmakuInstance: (danmakuInstance) => set(() => ({ danmakuInstance })),
}));

export { useGlobalState };
