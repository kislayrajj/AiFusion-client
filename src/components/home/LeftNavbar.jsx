import React from "react";
import tabs from "./../../Data/LeftNavbarData.json";
import {Link, useLocation} from "react-router-dom"

const LeftNavbar = () => {
  const location= useLocation()
  return (
    <div>
      <div className="bg-black h-[94vh] w-12 md:w-14 lg:w-16 flex justify-center items-start pt-10">
        <div className="flex flex-col justify-between gap-10 items-center md:text-2xl text-xl">
          {tabs?.map((tab, idx) => {
          const isActive = location.pathname===tab?.route
            return (
              <Link to={tab?.route} key={idx} title={tab.title}
              className={`relative p-2 ${
                isActive ? "text-green-400 scale-110" : "text-gray-400 hover:text-white"
              } transition-all duration-300`}
              >
                <i className={tab?.icon}></i>
                {isActive && (
                <div className="absolute left-[27%] bottom-0 -translate-y-1/2 h-1 w-4 bg-green-400 rounded-full"></div>
              )}
              </Link>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LeftNavbar;
