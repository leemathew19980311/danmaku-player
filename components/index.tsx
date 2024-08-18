"use client";
import Image from "next/image";
import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";

import { useGlobalState } from "./utils";
import SelectFile from "./selectFile";
import Play from "./play";
import damakuList from "./fake.json";
import { useEffect } from "react";

const aside: Variants = {
  openPlayer: {
    width: 0,
    transition: { ease: "easeOut" },
  },
  closePlayer: {
    width: "25%",
    transition: { ease: "easeOut" },
  },
};

const main: Variants = {
  openPlayer: {
    backgroundColor: "#000",
    transition: { ease: "easeOut", duration: 1 },
  },
  closePlayer: {
    backgroundColor: "#94a3b8",
  },
};

const Index: React.FC = () => {
  const file = useGlobalState((state) => state.file);

  return (
    <motion.div
      className="w-full h-full flex"
      initial={false}
      animate={file ? "openPlayer" : "closePlayer"}
    >
      <motion.aside
        variants={aside}
        className="w-1/4 h-full flex items-center justify-center bg-slate-800"
      >
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          priority
        ></Image>
      </motion.aside>
      <motion.main layout className="flex-1 bg-slate-400" variants={main}>
        <SelectFile />
        <Play />
      </motion.main>
    </motion.div>
  );
};

export default Index;
