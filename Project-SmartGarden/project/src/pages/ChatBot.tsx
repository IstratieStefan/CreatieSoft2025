import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import {getBotResponse} from "../communication.mjs";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your SmartGarden Assistant. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const handleSubmit =async  (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: input }]);

    // Get bot response
    const botResponse = await getBotResponse(input);

    // Add bot response
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        content: botResponse,
      },
    ]);

    setInput('');
  };
  return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 max-w-full">
        <div className="mx-auto max-w-4xl px-4 py-8 max-w-full">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-full">
            <div className="p-4 bg-emerald-600">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Garden Assistant</h2>
              </div>
            </div>
            {/* Chat messages */}
            <div className="h-[600px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                  <div
                      key={index}
                      className={`flex ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
              ))}
            </div>
            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your garden..."
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}