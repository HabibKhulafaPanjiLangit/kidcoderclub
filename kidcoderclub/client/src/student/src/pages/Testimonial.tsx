import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Star } from 'lucide-react';

export default function Testimonial() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [myTestimonials, setMyTestimonials] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
    if (user) {
      fetchMyTestimonials();
    }
  }, [user]);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*, students(full_name)')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(20);

    setTestimonials(data || []);
  };

  const fetchMyTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('student_id', user!.id)
      .order('created_at', { ascending: false });

    setMyTestimonials(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('testimonials').insert({
      student_id: user!.id,
      content: formData.content,
      rating: formData.rating,
      is_approved: false,
    });

    if (!error) {
      setShowForm(false);
      setFormData({ content: '', rating: 5 });
      fetchMyTestimonials();
      alert('Thank you for your testimonial! It will be reviewed and published soon.');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Testimonials</h1>
        <p className="text-gray-600 text-lg mb-6">
          Hear what our students have to say about their learning experience
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Share Your Experience
        </button>
      </div>

      {showForm && (
        <div className="max-w-2xl mx-auto mb-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Write Your Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } hover:scale-110 transition-transform`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Testimonial
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience with KidCoderClub..."
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Testimonial
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {myTestimonials.length > 0 && (
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Testimonials</h2>
          <div className="space-y-4">
            {myTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-xl shadow p-6 border-2 ${
                  testimonial.is_approved ? 'border-green-200' : 'border-yellow-200'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  {renderStars(testimonial.rating)}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      testimonial.is_approved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {testimonial.is_approved ? 'Published' : 'Pending Review'}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
                <p className="text-sm text-gray-500 mt-3">
                  {new Date(testimonial.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Students Say</h2>
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{renderStars(testimonial.rating)}</div>
                <p className="text-gray-700 leading-relaxed mb-4">{testimonial.content}</p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-semibold text-gray-900">
                    {testimonial.students?.full_name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
