import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AI() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function predictHealth(e) {
    e.preventDefault();
    setGeneratingAnswer(true);

    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    setMessage("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDtP6S5UpWlXA34PFEUjIOWzkDH7QPBdm8`,
        {
          contents: [{ parts: [{ text: message }] }],
        }
      );

      setChatHistory([
        ...chatHistory,
        { sender: "user", text: message },
        {
          sender: "ai",
          text: response.data.candidates[0].content.parts[0].text,
        },
      ]);
    } catch (error) {
      console.error(
        "Error during API call:",
        error.response ? error.response.data : error.message
      );
      setChatHistory([
        ...chatHistory,
        { sender: "user", text: message },
        {
          sender: "ai",
          text: "Sorry - Something went wrong. Please try again!",
        },
      ]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-green-300 p-3">
      <div className="w-full max-w-lg text-center rounded-lg shadow-lg bg-white p-6">
        <a
          href="https://github.com/sandeepsaha522"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4 animate-bounce">
            Ask anything!
          </h1>
        </a>
        {chatHistory.length > 0 && (
          <div className="chat-container border border-gray-300 rounded p-4 mb-4 max-h-80 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`message ${
                  chat.sender === "user" ? "text-right" : "text-left"
                } mb-2`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    chat.sender === "user"
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <ReactMarkdown>{chat.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={predictHealth} className="w-full flex">
          <input
            required
            type="text"
            className="flex-grow border border-gray-300 rounded-l p-3 transition-all duration-300 focus:border-green-700 focus:shadow-lg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className={`bg-green-700 text-white p-3 rounded-r-md hover:bg-green-700 transition-all duration-300 ${
              generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AI;
