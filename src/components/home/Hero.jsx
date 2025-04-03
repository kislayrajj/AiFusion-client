import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col gap-12 justify-center items-center w-[90vw] h-full">
        <h1 className=" text-xl md:text-5xl font-bold"> AI Fusion</h1>
        <div className="flex justify-center items-center gap-2">
          <i class="fa-regular fa-hand-point-left"></i>
          <p className="text-xl bg-gradient-to-r from-violet-200 to-pink-200 bg-clip-text text-transparent">Select AIs from side bar to get started.</p>

        </div>
      </div>
    </div>
  );
};

export default Hero;
