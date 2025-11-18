import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Handshake, ExternalLink } from 'lucide-react';

export default function Partnerships() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const fetchPartnerships = async () => {
    const { data } = await supabase
      .from('partnerships')
      .select('*')
      .order('created_at', { ascending: false });

    setPartners(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading partnerships...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <Handshake className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h1>
        <p className="text-gray-600 text-lg">Working together to provide the best learning experience</p>
      </div>

      {partners.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No partnerships available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {partner.company_name}
                    </h3>
                    {partner.logo_url && (
                      <img
                        src={partner.logo_url}
                        alt={partner.company_name}
                        className="h-16 object-contain mb-4"
                      />
                    )}
                  </div>
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{partner.description}</p>
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Partner</h2>
        <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
          Join us in empowering the next generation of coders. Let's create amazing learning opportunities together.
        </p>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
          Partner With Us
        </button>
      </div>
    </div>
  );
}
