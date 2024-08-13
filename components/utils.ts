import { create } from "zustand";

const useGlobalFile = create<{
  file: File | undefined;
  setFile: (file: File | undefined) => void;
}>((set) => ({
  file: undefined,
  setFile: (file) => set(() => ({ file })),
}));

export { useGlobalFile };
