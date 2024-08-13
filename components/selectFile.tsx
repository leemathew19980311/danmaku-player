"use client"
import { getFileFromLocal } from "@/utils"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { useGlobalFile } from "./utils"
import Main from "./main"
const leftVariants = {
    show: {
        x: 0
    },
    hidden: {
        translateX: '-100%'
    }
}
const rightVariants = {
    show: {
        x: 0
    },
    hidden: {
        translateX: '100%'
    }
}


const SelectFile: React.FC = () => {
    const { file, setFile } = useGlobalFile()

    const openFinder = () => {
        getFileFromLocal().then(file => {
            setFile(file)
        })
    }

    return <div className="w-full h-full flex">
        <motion.aside variants={leftVariants} animate={file ? 'hidden' : 'show'} className="w-1/4 h-full flex items-center justify-center bg-slate-800">
            <Image src='/vercel.svg' alt="logo" width={100} height={100}></Image>
        </motion.aside>
        <motion.main variants={rightVariants} animate={file ? 'hidden' : 'show'} className="flex-1 bg-slate-400 p-20">
            <motion.div className="flex flex-col gap-2 " >
                <Button className="justify-start bg-transparent hover:bg-slate-300" onClick={openFinder}>打开...</Button>
                <Button className="justify-start bg-transparent hover:bg-slate-300">打开URL...</Button>
            </motion.div>
        </motion.main>
        <Main />
    </div>
}

export default SelectFile