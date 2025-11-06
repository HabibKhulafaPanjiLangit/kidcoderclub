import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, Send } from 'lucide-react';

export default function Feedback() {
  const { user } = useAuth();
  const [myFeedback, setMyFeedback] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'General',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = ['General', 'Suggestion', 'Complaint', 'Technical Issue', 'Course Content', 'Other'];

  useEffect(() => {
    if (user) {
      fetchMyFeedback();
    }
  }, [user]);

  const fetchMyFeedback = async () => {
    const { data } = await supabase
      .from('feedback')
      .select('*')
      .eq('student_id', user!.id)
      .order('created_at', { ascending: false });

    setMyFeedback(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    const { error } = await supabase.from('feedback').insert({
      student_id: user!.id,
      subject: formData.subject,
      message: formData.message,
      category: formData.category,
    });

    if (!error) {
      setSuccess(true);
      setFormData({ subject: '', message: '', category: 'General' });
      fetchMyFeedback();
      setTimeout(() => setSuccess(false), 5000);
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Feedback & Suggestions</h1>
        <p className="text-gray-600 text-lg">
          We value your opinion! Share your thoughts to help us improve
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Feedback</h2>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                Thank you for your feedback! We'll review it carefully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief summary of your feedback"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your detailed feedback or suggestions..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 mr-2" />
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Feedback Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Be specific about your experience or suggestion</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Include relevant details like course names or features</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Constructive criticism helps us improve</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>We read and consider all feedback carefully</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Previous Feedback</h2>
          {myFeedback.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">You haven't submitted any feedback yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-xl shadow p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{feedback.subject}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {feedback.category}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {feedback.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    Submitted on {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
