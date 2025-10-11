import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: 'Hi! How can I help you today?', isBot: true },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'How do I enroll in a course?',
    'Where can I see my certificates?',
    'How do I submit assignments?',
    'How do I join WhatsApp groups?',
  ];

  const botResponses: { [key: string]: string } = {
    'enroll': 'To enroll in a course, go to the Courses page, browse available courses, and click "Enroll Now" on the course you want to join.',
    'certificate': 'You can view your certificates in the Dashboard. Certificates are automatically generated when you complete 100% of a course.',
    'assignment': 'To submit an assignment, go to the course page, find the assignment section, and click "Submit Assignment" to upload your work.',
    'whatsapp': 'WhatsApp group links are available on each course page after you enroll. Look for the "Join Community" section.',
    'default': 'Thank you for your question! Our support team will assist you. You can also check the FAQ page or contact us directly through the Feedback page.',
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = botResponses.default;

      if (lowerInput.includes('enroll') || lowerInput.includes('join')) {
        response = botResponses.enroll;
      } else if (lowerInput.includes('certificate')) {
        response = botResponses.certificate;
      } else if (lowerInput.includes('assignment') || lowerInput.includes('submit')) {
        response = botResponses.assignment;
      } else if (lowerInput.includes('whatsapp') || lowerInput.includes('community')) {
        response = botResponses.whatsapp;
      }

      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    }, 500);

    setInput('');
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-50"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 mr-2" />
              <div>
                <h3 className="font-bold">CS Support</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
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
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-3 space-y-2">
              <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
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
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleSend}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
