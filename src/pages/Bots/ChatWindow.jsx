import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import API_BASE_URL from "../../../config";
import { motion } from "framer-motion";

const socket = io(API_BASE_URL, {
  path: "/socket.io/",
  transports: ["websocket", "polling"],
  withCredentials: true,
});
socket.on("connect", () => console.log("WebSocket connected!"));
socket.on("disconnect", () => console.log("WebSocket disconnected!"));

const ChatWindow = ({ bot }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // chat starts from bottom(scroll)
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/chat/getMessage?bot=${bot.title}`)
      .then((response) => {
        setMessages(response.data);
        scrollToBottom();
      })
      .catch((error) => console.error("Error fetching messages:", error));

    const botEvent = `chat message ${bot.title}`;

    socket.on(botEvent, (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom();
    });

    return () => {
      socket.off(botEvent);
    };
  }, [bot]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "User", message: input, bot: bot.title };

    // Log message being sent
    console.log("Sending message:", newMessage);

    // Update UI immediately
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    // Emit bot-specific event
    const botEvent = `chat message ${bot.title}`;
    // socket.emit(botEvent, newMessage); // Only emit user's message
    socket.emit(botEvent, { ...newMessage, bot: bot.title });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/chat/sendMessage`,
        {
          message: input,
          bot: bot.title,
        }
      );
      const botReply = {
        sender: bot.title,
        message: response.data.botReply,
        bot: bot.title,
        _id: response.data.botMessageId,
      };

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg === newMessage
            ? { ...msg, _id: response.data.userMessageId }
            : msg
        )
      );
      // Emit bot response through socket
      socket.emit(botEvent, botReply);

      // Immediately update state to show bot's response without refresh
      setMessages((prevMessages) => [...prevMessages, botReply]);

      console.log("Bot response:", response.data.botReply);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  // delete msg
  const deleteMessage = async (id) => {
    if (!id) {
      console.error("Cannot delete message without an ID.");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/api/bot/deleteMessage/${id}`);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // // formate timestamp
  // const formatTime = (timestamp) => {
  //   if (!timestamp) return "";  // Don't display anything until it's available
  //   const date = new Date(timestamp);
  //   return isNaN(date.getTime()) ? "" : date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  // };
  // clear chat
  const clearChat = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to clear the chat?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/bot/clearChat?bot=${bot.title}`);
      setMessages([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };
  return (
    <div className="flex flex-col w-full h-[90vh] shadow-lg rounded-lg">
      <div className="text-white py-3 px-5 flex items-center justify-between bg-gray-800">
        <div title={bot?.description}>
          <h2 className="text-lg font-semibold">{bot.name} </h2>
          <div className="text-sm text-gray-500">{bot?.provider}</div>
        </div>
        <button
          onClick={clearChat}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-sm opacity-80 hover:opacity-100">
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.sender === "User" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: msg.sender === "User" ? 50 : -50 }}
            transition={{ duration: 0.3 }}
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
              {msg.message}
              {/* <div className="text-xs opacity-75 mt-1">{formatTime(msg.timestamp)}</div> */}

              <div
                onClick={() => deleteMessage(msg._id)}
                className="absolute  text-xs top-1 right-1 cursor-pointer opacity-50 hover:opacity-100">
                <i className="fa-solid fa-trash-can"></i>
              </div>
            </div>
          </motion.div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
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

export default ChatWindow;
