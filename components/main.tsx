import { motion, Variants } from "framer-motion"
import { useGlobalFile } from "./utils"
const variants: Variants = {
    show: {
        scale: 1,
        display: "block"

    },
    hidden: {
        scale: 0,
        display: "none"
    }
}
const Main: React.FC = () => {
    const file = useGlobalFile(state => state.file)
    return <motion.main variants={variants} animate={file ? "show" : "hidden"}>
        <video src={file ? URL.createObjectURL(file) : ""} controls></video>
    </motion.main>
}

export default Main