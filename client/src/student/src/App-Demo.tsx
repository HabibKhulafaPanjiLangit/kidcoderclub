import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">KidCoderClub</h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Demo Version - Test Chatbot
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to KidCoderClub! 🚀
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Learn coding in a fun and interactive way
          </p>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interactive Courses
              </h3>
              <p className="text-gray-600">
                Learn programming with hands-on projects and fun activities
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Mentors
              </h3>
              <p className="text-gray-600">
                Get guidance from experienced developers and educators
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Certificates
              </h3>
              <p className="text-gray-600">
                Earn certificates as you complete courses and projects
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gamified Learning
              </h3>
              <p className="text-gray-600">
                Make coding fun with games, challenges, and rewards
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Connect with other young coders in our WhatsApp groups
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Assistant
              </h3>
              <p className="text-gray-600">
                Get instant help from our smart chatbot powered by Gemini AI
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-blue-100 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Try Our AI Chatbot! 🤖
            </h3>
            <p className="text-blue-700 mb-4">
              Click the chatbot icon in the bottom-right corner to start chatting with our AI assistant.
              Ask questions about courses, assignments, certificates, or anything about KidCoderClub!
            </p>
            <div className="flex justify-center space-x-4 text-sm text-blue-600">
              <span>• "How do I enroll in a course?"</span>
              <span>• "Where can I see my certificates?"</span>
              <span>• "How do I join WhatsApp groups?"</span>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}

export default App;