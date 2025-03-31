import React from "react";
import TopNavbar from "./TopNavbar";
import LeftNavbar from "./LeftNavbar";
import Hero from "./Hero";
import { Routes, Route } from "react-router-dom";
import Menu from "./../../pages/Menu"
import Chats from "./../../pages/Chats"
import Ai_Bots from "./../../pages/AI_Bots"
import Status from "./../../pages/Status"
import AI_Experts from "../../pages/AI_Experts";

const home = () => {
  return (
    <div>
      <TopNavbar />
      <div className="flex">
        <LeftNavbar />
        <Routes>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/chats" element={<Chats />}/>
        <Route path="/ai-bots" element={<Ai_Bots />}/>
        <Route path="/status" element={<Status />}/>
        <Route path="/ai-experts" element={<AI_Experts />}/>
        </Routes>
        <Hero />
      </div>
    </div>
  );
};

export default home;
