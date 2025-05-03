import React from "react";
import tabs from "./../../Data/LeftNavbarData.json";
import {Link, useLocation} from "react-router-dom"
import { useSelector } from "react-redux";

const LeftNavbar = () => {
  const location= useLocation()
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div>
      <div className={`h-[94vh] w-12 md:w-14 lg:w-16 flex justify-center items-start pt-10 ${theme=='dark' ? "bg-black":"bg-gradient-to-b from-slate-50 to-violet-700"}`}>
        <div className="flex flex-col justify-between gap-10 items-center md:text-2xl text-xl">
          {tabs?.map((tab, idx) => {
          const isActive = location.pathname===tab?.route
            return (
              <Link to={tab?.route} key={idx} title={tab.title}
              className={`relative p-2 ${
                isActive ? ` scale-110 ${theme=='dark' ? "text-green-400":"text-blue-600"}` : `${theme=='dark' ? "text-gray-400 hover:text-white":"text-gray-800 hover:text-black"}`
              } transition-all duration-300`}
              >
                <i className={tab?.icon}></i>
                {isActive && (
                <div className={`absolute left-[27%] bottom-0 -translate-y-1/2 h-1 w-4 ${theme == "dark" ? "bg-green-400" : "bg-blue-600"
                } rounded-full`}></div>
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
