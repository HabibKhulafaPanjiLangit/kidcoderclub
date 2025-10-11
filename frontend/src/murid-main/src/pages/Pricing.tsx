import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Check, DollarSign } from 'lucide-react';

export default function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    const { data } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('order_index', { ascending: true });

    setPlans(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading pricing plans...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 text-lg">Select the perfect plan for your coding journey</p>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No pricing plans available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
                plan.is_popular
                  ? 'border-blue-600 scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.is_popular && (
                <div className="bg-blue-600 text-white text-center py-2 font-bold text-sm">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6 min-h-[48px]">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    Rp {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.is_popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
                {plan.features && plan.features.length > 0 && (
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Need a custom plan?{' '}
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Contact us
          </button>
        </p>
      </div>
    </div>
  );
}
