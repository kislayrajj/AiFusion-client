import React from "react";

const ExpertAiLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="flex flex-col gap-12">
        <h1 className="text-3xl text-gray-400 italic">
          Get expert insights in just one click!
        </h1>
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <div className="flex items-center gap-3">
            <i className="fa-regular fa-hand-point-left"></i>
            <h2 className="text-xl font-semibold">Select an Expert Assistant</h2>
          </div>
          <p className="text-gray-300 mt-2">
            Choose an AI expert from the left panel to get insights instantly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertAiLanding;
