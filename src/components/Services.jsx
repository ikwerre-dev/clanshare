import React from 'react'
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServiceSection() {
  const companies = [
    {
      logo: "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
      name: "AARDY",
      website: "aardy.com",
      rating: 4.9,
      reviews: 28951,
    },
    {
      logo: "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
      name: "TripInsure101",
      website: "tripinsure101.com",
      rating: 4.9,
      reviews: 3189,
    },
    {
      logo: "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
      name: "MexiPass International Insurance",
      website: "www.mexipass.com",
      rating: 4.9,
      reviews: 1718,
    },
    {
      logo: "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
      name: "Travel Defenders",
      website: "traveldefenders.com",
      rating: 4.9,
      reviews: 1282,
    },
  ]

  return (
    <div className="w-full px-4 sm:px-20 py-[3rem] sm:py-8 space-y-8 sm:space-y-12" id='services'>
      {/* Best in Travel Insurance Section */}
      <div className="space-y-6 mt-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl text-white font-bold">Recent Searches</h2>
         </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((company, index) => (
            <div key={index} className="p-4 sm:p-6 bg-white rounded-lg shadow-sm border relative">
              <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-green-500" />
              <div className="space-y-4">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-8 object-contain"
                />
                <div>
                  <h3 className="font-bold">{company.name}</h3>
                  <p className="text-gray-600 text-sm">{company.website}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                    ))}
                  </div>
                  <span className="font-bold">{company.rating}</span>
                  <span className="text-gray-500">({company.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* We're Trustpilot Section */}
      <div className="bg-[#C1E8D6] rounded-2xl p-6 sm:p-8 md:p-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">We're Trustpilot</h2>
            <p className="text-base sm:text-lg pb-5">
              We're a review platform that's open to everyone. Our vision is to become a universal 
              symbol of trust — by empowering people to shop with confidence, and helping companies improve.
            </p>
            <Link to={'/search'}  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-colors">
              What we do
            </Link>
          </div>
          
          <div className="bg-[#1C3337] text-white p-4 sm:p-6 rounded-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Our Transparency Report has landed!</h3>
            <p className="mb-6">
              Find out which actions we've taken to protect you and promote trust on our platform this year.
            </p>
            <div className="flex justify-between items-center">
              <Link to={'/search'}  className="border border-white px-4 sm:px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors text-sm sm:text-base">
                Take a look
              </Link>
              <div className="flex gap-1">
                {['2', '0', '2', '4'].map((num, i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg text-base sm:text-xl font-bold
                      ${i === 0 ? 'bg-white text-black' : 
                        i === 1 ? 'bg-orange-400' :
                        i === 2 ? 'bg-pink-400' : 'bg-yellow-400'}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold">Recent reviews</h2>
        <div className="flex gap-2">
          <Link to={'/search'}  className="p-1 sm:p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Link to={'/search'}  className="p-1 sm:p-2 rounded-full hover:bg-gray-100">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}