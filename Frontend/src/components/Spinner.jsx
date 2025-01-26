import { motion } from "framer-motion";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Spinner;
