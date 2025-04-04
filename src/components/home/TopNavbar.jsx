import React from "react";
import { motion } from "framer-motion";

const TopNavbar = () => {
  return (
    <div>
      <div className="flex justify-start items-center p-2 px-4 md:text-xl bg-black h-12 md:h-14 lg:h-16">
        <div className="flex justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <i className="fa-brands fa-rocketchat"> </i>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <a href="/">AI Fusion</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
