import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import API_BASE_URL from "../../../config";
import { motion } from "framer-motion";

const socket = io(API_BASE_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const ExpertChatWindow = ({ expert }) => {
  const [messages, setMessages] = useState({}); // Separate messages per expert
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (!expert) return;

    // Fetch messages for the selected expert only
    axios
      .get(`${API_BASE_URL}/api/experts/getMessage?expert=${expert.title}`)
      .then((response) => {
        setMessages((prev) => ({
          ...prev,
          [expert.title]: response.data || [],
        }));
        scrollToBottom();
      })
      .catch((error) => console.error("Error fetching messages:", error));

    const expertEvent = `chat message ${expert.title}`;

    socket.on(expertEvent, (msg) => {
      setMessages((prev) => ({
        ...prev,
        [expert.title]: [...(prev[expert.title] || []), msg],
      }));
      scrollToBottom();
    });

    return () => {
      socket.off(expertEvent);
    };
  }, [expert]);

  const sendMessage = async () => {
    if (!input.trim() || !expert) return;

    const newMessage = { sender: "User", message: input, expert: expert.title };

    // Immediately update UI for current expert
    setMessages((prev) => ({
      ...prev,
      [expert.title]: [...(prev[expert.title] || []), newMessage],
    }));

    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/experts/sendMessage`,
        {
          message: input,
          bot: expert.title, // Send correct system name
        }
      );

      const expertReply = {
        sender: expert.name,
        message: response.data.response, // Ensure correct response key
        expert: expert.title,
      };

      socket.emit(`chat message ${expert.title}`, expertReply);

      setMessages((prev) => ({
        ...prev,
        [expert.title]: [...(prev[expert.title] || []), expertReply],
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-[90vh] shadow-lg rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-white py-3 px-5 flex items-center justify-between bg-gray-800">
        <h2 className="text-lg font-semibold">{expert.title}</h2>
        <button
          onClick={() =>
            setMessages((prev) => ({ ...prev, [expert.title]: [] }))
          }
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-sm opacity-80 hover:opacity-100">
          Clear Chat
        </button>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {(messages[expert.title] || []).map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`relative p-3 rounded-lg max-w-xs text-white ${
                msg.sender === "User"
                  ? "bg-violet-500 rounded-br-none"
                  : "bg-gray-500 rounded-bl-none"
              }`}>
              <strong className="block text-sm">{msg.sender}</strong>
              <div>{msg.message}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg max-w-xs bg-gray-500 text-white">
              <span className="animate-pulse italic">⏳...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="p-3 flex items-center border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default ExpertChatWindow;
