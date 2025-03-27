import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8000"); // Connect to backend

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch chat history from MongoDB
  useEffect(() => {
    axios.get("http://localhost:8000/api/chat/getMessage")
      .then(response => setMessages(response.data))
      .catch(error => console.error("Error fetching messages:", error));

    socket.on("chat message", (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "User", message: input };

    // Send to socket server
    socket.emit("chat message", newMessage);

    // Save message to MongoDB
    await axios.post("http://localhost:8000/api/chat/sendMessage", newMessage);

    // Get bot response
    const botResponse = await axios.post("http://localhost:8000/api/bot/ask", {
      message: input,
    });

    socket.emit("chat message", { sender: "AI", message: botResponse.data.botReply });

    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col w-full h-[95vh]  shadow-lg rounded-lg">
      
      {/* Header */}
      <div className=" text-white py-3 px-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Fusion Chat</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs text-white ${
                msg.sender === "User"
                  ? "bg-violet-500 rounded-br-none"
                  : "bg-gray-500 rounded-bl-none"
              }`}
            >
              <strong className="block text-sm">{msg.sender}</strong>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 flex items-center border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          onClick={sendMessage} 
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Chat;
