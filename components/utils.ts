import { create } from "zustand";

const useGlobalState = create<{
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  danmakuInstance: any | null;
  setDanmakuInstance: (danmakuInstance: any) => void;
  file_hash: string | undefined;
}>((set) => ({
  file: undefined,
  danmakuInstance: null,
  file_hash: undefined,
  setFile: (file) => set(() => ({ file })),
  setDanmakuInstance: (danmakuInstance) => set(() => ({ danmakuInstance })),
}));

export { useGlobalState };
