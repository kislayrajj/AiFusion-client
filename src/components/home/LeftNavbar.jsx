import React from "react";
import tabs from "./../../Data/LeftNavbarData.json";
import {Link} from "react-router-dom"

const LeftNavbar = () => {
  return (
    <div>
      <div className="bg-black h-[96vh] w-12 md:w-14 lg:w-16 flex justify-center items-start pt-10">
        <div className="flex flex-col justify-between gap-10 items-center md:text-2xl text-xl">
          {tabs?.map((tab, idx) => {
            return (
              <Link to={tab?.route} key={idx} title={tab.title}>
                <i className={tab?.icon}></i>
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
