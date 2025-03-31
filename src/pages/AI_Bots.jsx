import React, { useState } from "react";
import AI_Bots_data from "../Data/bots/bots_data";
import ChatWindow from "./Bots/ChatWindow"

const AI_Bots = () => {
  const [selectedBot, setSelectedBot] = useState(null);

  return (
    <div className=" flex w-full">
      {/* Left Side: AI Bots List */}
      <div className=" border p-0.5 md:p-2">
        <div className="flex flex-col md:flex-row justify-between items-center md:gap-12">
          <div className="text-sm md:text-xl">AI Bots</div>
          <div>
            <input
              type="search"
              placeholder="search"
              className="border rounded outline-none p-0.5 md:p-1 w-20 md:w-auto"
            />
          </div>
        </div>
        <div className="p-1 pt-6 md:pt-12 flex flex-col gap-2">
          {AI_Bots_data?.map((bot, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedBot(bot)} // Set bot on click
              className={`flex items-center gap-4 md:gap-6 border-2 p-2 rounded border-gray-500  cursor-pointer duration-75 ${
                selectedBot?.title === bot.title ? "bg-gray-800 text-white" : "hover:bg-black hover:border-gray-100 hover:rounded-xl"
              }`}
            >
              <div className="size-6 md:size-14 flex justify-center items-center border rounded-full overflow-hidden">
                {bot?.logo ? (
                  <img
                    src={bot?.logo}
                    alt={bot.title}
                    className="size-5 md:size-12 object-cover"
                  />
                ) : (
                  <i className={bot?.icon}></i>
                )}
              </div>
              <div title={bot?.provider}>{bot?.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Render ChatWindow Component */}
      <div className="w-2/3 border p-4">
        {selectedBot ? (
          <ChatWindow bot={selectedBot} />
        ) : (
          <p className="text-gray-500">Select a bot to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default AI_Bots;
