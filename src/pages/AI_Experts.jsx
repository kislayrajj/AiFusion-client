import React, { useState } from "react";
import AI_Experts_data from "../Data/bots/AI_Experts_data";
import AI_ExpertChatWindow from "./Bots/AI_ExpertChatWindow";
import ExpertAiLanding from "../components/home/ExpertAiLanding";

const AI_Experts = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);

  return (
    <div className="flex w-full">
      {/* Left Side: AI Experts List */}
      <div className="border border-r-0 p-0.5 md:p-2 lg:min-w-[350px]">
        <div className="flex flex-col md:flex-row justify-between items-center flex-wrap md:flex-nowrap md:gap-12 relative">
          <div className="text-sm md:text-xl">AI Experts</div>
          {/* <input
            type="search"
            placeholder="Search Experts..."
            className="border rounded outline-none p-0.5 md:p-1 w-20 sm:w-28 md:w-auto"
          /> */}
        </div>
        <div className="p-1 pt-6 md:pt-12 flex flex-col gap-2">
          {AI_Experts_data?.map((expert, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedExpert(expert)}
              className={`flex items-center gap-4 md:gap-6 border-2 p-2 rounded border-gray-500 cursor-pointer duration-75 ${
                selectedExpert?.title === expert.title
                  ? "bg-gray-800 text-white"
                  : "hover:bg-black hover:border-gray-100 hover:rounded-xl"
              }`}
            >
              <div className="size-6 md:size-14 flex justify-center items-center border rounded-full overflow-hidden">
                {expert?.logo ? (
                  <img
                    src={expert?.logo}
                    alt={expert.title}
                    className="size-5 md:size-12 object-cover"
                  />
                ) : (
                  <i className={expert?.icon}></i>
                )}
              </div>
              <div title={expert?.provider}>{expert?.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Render Chat Window for Experts */}
      <div className="w-full border p-4">
        {selectedExpert ? (
          <AI_ExpertChatWindow expert={selectedExpert} />
        ) : (
       < ExpertAiLanding/>
        )}
      </div>
    </div>
  );
};

export default AI_Experts;
