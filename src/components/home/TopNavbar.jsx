import React from "react";

const TopNavbar = () => {
  return (
    <div>
      <div className="flex justify-start items-center p-2 px-4 md:text-xl bg-black h-12 md:h-14 lg:h-16">
        <div className="flex justify-between gap-5">
          <div>
            <i className="fa-brands fa-rocketchat"> </i>
          </div>
          <div><a href="/">AI Fusion</a></div>
        </div>
      </div>
      
    </div>
  );
};

export default TopNavbar;
