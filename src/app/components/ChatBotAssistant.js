"use client";

import { useState, useEffect, useRef } from "react";
import { BsSend, BsChevronDown, BsChevronUp, BsFillChatDotsFill } from "react-icons/bs";

export default function ChatBotAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const chatEndRef = useRef(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { sender: "user", text: inputText };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    try {
      const botResponse = await getBotResponse(userMessage.text);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  const getBotResponse = async (message) => {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.reply;
  };

  return (
    <div className={`fixed bottom-0 right-0 mb-4 mr-4 w-80 max-h-96 border border-gray-700 rounded-lg bg-black shadow-lg flex flex-col transition-transform ${isVisible ? "transform translate-y-0" : "transform translate-y-full"}`}>
      <div className="chat-header bg-gray-800 text-white p-2 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg">Chat Assistance</h2>
        <button
          className="text-white"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <BsChevronDown size={20} /> : <BsChevronDown size={20} />}
        </button>
      </div>

      {isVisible && (
        <>
          <div className="chat-body p-3 flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`message mt-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg max-w-xs ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-footer p-2 border-t border-gray-700 flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-600 rounded-lg text-black p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              className="ml-2 p-2 text-blue-500 hover:text-blue-700"
              onClick={handleSendMessage}
            >
              <BsSend size={20} />
            </button>
          </div>
        </>
      )}

      {!isVisible && (
        <button
          className="fixed bottom-0 right-0 mb-4 mr-4 bg-blue-500 text-white p-2 rounded-full"
          onClick={() => setIsVisible(true)}
        >
          <BsFillChatDotsFill size={24} />
        </button>
      )}
    </div>
  );
}
