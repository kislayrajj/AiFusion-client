import React from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div>
      <div className={`flex flex-col gap-12 justify-center items-center h-[94vh]  w-full 
        ${theme == "dark" ? "":"bg-gray-300  text-black"}`}>
        <h1 className=" text-xl md:text-5xl font-bold"> AI Fusion</h1>
        <div className="flex justify-center items-center gap-2">
          <i class="fa-regular fa-hand-point-left"></i>
          <p className={`text-xl  ${theme == "dark" ? "bg-gradient-to-r from-violet-200 to-pink-200 bg-clip-text text-transparent":"bg-gray-300  text-black"}`}>Select AIs from side bar to get started.</p>

        </div>
      </div>
    </div>
  );
};

export default Hero;
