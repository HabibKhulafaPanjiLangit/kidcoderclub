import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Andi Pratama',
      age: '10 tahun',
      type: 'student',
      class: 'Scratch Programming',
      rating: 5,
      message: 'Belajar coding di KidCoder Club sangat seru! Aku bisa bikin game sendiri dan mentor-mentornya baik banget. Sekarang aku jadi lebih suka matematika!',
      avatar: '👦',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      name: 'Ibu Sarah (Mama Andi)',
      age: 'Orang Tua',
      type: 'parent',
      class: 'Scratch Programming',
      rating: 5,
      message: 'Anak saya jadi lebih kreatif dan logis setelah belajar di KidCoder Club. Mentor-mentornya sangat sabar dan metode pembelajarannya mudah dipahami anak-anak.',
      avatar: '👩',
      color: 'from-pink-400 to-purple-500'
    },
    {
      id: 3,
      name: 'Maya Sari',
      age: '12 tahun',
      type: 'student',
      class: 'Minecraft Coding',
      rating: 5,
      message: 'Ternyata coding itu tidak sesulit yang aku bayangkan! Dengan Minecraft, aku belajar sambil bermain. Sekarang aku sudah bisa bikin kastil otomatis!',
      avatar: '👧',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 4,
      name: 'Bapak Budi (Papa Maya)',
      age: 'Orang Tua',
      type: 'parent',
      class: 'Minecraft Coding',
      rating: 5,
      message: 'Investasi terbaik untuk masa depan anak! Maya jadi lebih percaya diri dan punya skill yang berguna untuk era digital. Terima kasih KidCoder Club!',
      avatar: '👨',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 5,
      name: 'Rizki Ramadhan',
      age: '13 tahun',
      type: 'student',
      class: 'Python for Kids',
      rating: 5,
      message: 'Python ternyata asik banget! Aku udah bisa bikin kalkulator dan game sederhana. Mentor Kak Maya selalu kasih penjelasan yang mudah dimengerti.',
      avatar: '👦',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 6,
      name: 'Ibu Lina (Mama Rizki)',
      age: 'Orang Tua',
      type: 'parent',
      class: 'Python for Kids',
      rating: 5,
      message: 'Rizki jadi lebih mandiri dalam belajar dan problem solving-nya meningkat drastis. Dia bahkan mulai tertarik dengan matematika dan sains!',
      avatar: '👩',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Testimoni</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Apa Kata
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Siswa & Orang Tua?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman siswa dan orang tua yang telah bergabung dengan KidCoder Club
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center justify-center mb-6">
                    <Quote className="w-12 h-12 text-purple-200" />
                  </div>
                  
                  <div className="text-center mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      "{testimonial.message}"
                    </p>
                    <StarRating rating={testimonial.rating} />
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-2xl`}>
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.age}</p>
                      <p className="text-purple-600 text-sm font-medium">{testimonial.class}</p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      testimonial.type === 'student' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {testimonial.type === 'student' ? '👨‍🎓 Siswa' : '👨‍👩‍👧‍👦 Orang Tua'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Kepuasan Siswa</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
              <div className="text-gray-600">Rating Orang Tua</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Siswa Bahagia</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Tingkat Penyelesaian</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;