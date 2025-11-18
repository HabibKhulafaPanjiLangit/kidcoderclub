import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import GeminiService from '../services/geminiService';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
  id: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: 'Hi! I\'m your KidCoderClub assistant! 🤖 How can I help you today?', 
      isBot: true, 
      timestamp: new Date(),
      id: '1'
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [geminiService] = useState(() => new GeminiService());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'How do I enroll in a course?',
    'Where can I see my certificates?',
    'How do I submit assignments?',
    'How do I join WhatsApp groups?',
    'What coding languages can I learn?',
    'How do I contact my mentor?',
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateMessageId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input.trim(),
      isBot: false,
      timestamp: new Date(),
      id: generateMessageId()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Send message to Gemini AI
      const response = await geminiService.sendMessage(userMessage.text, messages);
      
      const botMessage: Message = {
        text: response.success ? response.text : geminiService.getFallbackResponse(userMessage.text),
        isBot: true,
        timestamp: new Date(),
        id: generateMessageId()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response if something goes wrong
      const fallbackMessage: Message = {
        text: geminiService.getFallbackResponse(input),
        isBot: true,
        timestamp: new Date(),
        id: generateMessageId()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center z-50 animate-pulse"
        >
          <Bot className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">KidCoder AI Assistant</h3>
                <p className="text-xs text-blue-100">
                  {isTyping ? 'Thinking...' : 'Powered by Gemini AI ✨'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-end space-x-2 max-w-[80%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                  {msg.isBot && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.isBot
                        ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                        : 'bg-blue-600 text-white rounded-br-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-500' : 'text-blue-200'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {!msg.isBot && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && !isTyping && (
            <div className="px-4 pb-3 space-y-2">
              <p className="text-xs text-gray-500 mb-3 font-medium">🚀 Quick questions to get you started:</p>
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="w-full text-left px-3 py-2 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-700 hover:shadow-sm"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isTyping && handleSend()}
                placeholder={isTyping ? "AI is thinking..." : "Ask me anything about KidCoderClub..."}
                disabled={isTyping}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
