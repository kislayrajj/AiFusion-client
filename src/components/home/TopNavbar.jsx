import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/themeSlice";
const TopNavbar = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [isTheme, setIsTheme] = useState(false);

  const themeOptions = ["dark", "light"];
  const toggleThemeBox = () => setIsTheme((prev) => !prev);

  const handleThemeChange = (selectedTheme) => {
    dispatch(setTheme(selectedTheme));
    setIsTheme(false);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center p-2 px-4 md:text-xl h-12 md:h-14 lg:h-16 ${
          theme == "dark"
            ? "bg-black text-white"
            : "bg-gradient-to-r from-slate-50 to-violet-700 text-black"
        }`}>
        <div className="flex items-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <i className="fa-brands fa-rocketchat"></i>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <a href="/" className="font-bold">
              AI Fusion
            </a>
          </motion.div>
        </div>

        <div className="relative flex justify-between gap-8">
          <div title="GitHub Repo" className="cursor-pointer">
            <a
              href="https://github.com/kislayrajj/AiFusion-client"
              target="_blank"
              rel="noopener noreferrer">
              {" "}
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
          <div onClick={toggleThemeBox} className="cursor-pointer">
            <i className="fa-solid fa-palette"></i>
          </div>

          {isTheme && (
            <div
              className={`absolute top-full right-0 mt-2 rounded p-2 shadow-lg z-10 ${
                theme === "dark" ? "bg-white text-black" : "bg-black text-white"
              }`}>
              <ul>
                {themeOptions.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleThemeChange(option)}
                    className={`p-2 rounded cursor-pointer hover:bg-gray-300 ${
                      theme === option ? "font-bold underline" : ""
                    }`}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
